import { createContext, useContext, useEffect, useReducer } from 'react'
import { Amplify } from 'aws-amplify'
import { Hub } from 'aws-amplify/utils'
import { amplifyConfig } from '../config'
import { ApolloLink, createHttpLink, from, Operation } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloClientContext } from '@app/contexts/apollo-client-context'
import GET_ONE_USER from '@app/operations/queries/users/get-one-user'
import REGISTER_ACCOUNT from '@app/operations/mutations/register-account'
import { LoginVariables, PasswordResetVariables, RegisterVariables, VerifyEmailVariables } from '@app/types'
import VERIFY_EMAIL from '@app/operations/mutations/verify-email'
import { defaultLinks, errorLink, restLink, strapiHttpLink } from '@app/apolloConfig'
import RESEND_SIGNUP from '@app/operations/mutations/resend-signup'
import FORGOT_PASSWORD from '@app/operations/mutations/forgot-password'
import RESET_PASSWORD from '@app/operations/mutations/reset-password'
import {
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
  signInWithRedirect,
} from '@aws-amplify/auth'
import { useRouter } from 'next/router'
import { PASSWORD_RESET_TYPE } from '@app/constants'
import { get } from 'http'

Amplify.configure(amplifyConfig)

interface AuthState {
  user: any
  isAuthenticated: boolean
  isInitialized: boolean
}

enum ActionTypes {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  SOCIAL_LOGIN = 'SOCIAL_LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  VERIFY_CODE = 'VERIFY_CODE',
  RESEND_CODE = 'RESEND_CODE',
  PASSWORD_RECOVERY = 'PASSWORD_RECOVERY',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

interface AuthAction {
  type: ActionTypes
  payload?: any
}

const createAuthApolloLink = (token?: string) => {
  // const authLink = setContext((_, { headers }) => ({
  //   headers: {
  //     ...headers,
  //     authorization: token ? `Bearer ${token}` : '',
  //   },
  // }))

  const hasuraHttpLink = createHttpLink({
    fetch,
    uri: process.env.NEXT_PUBLIC_HASURA_URL,
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  const httpLink = ApolloLink.split(
    (operation: Operation) => operation.getContext().clientName === 'strapi',
    strapiHttpLink, //if above
    hasuraHttpLink
  )

  return from([restLink, errorLink, httpLink])
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const handlers = {
  INITIALIZE: (state: AuthState, action: AuthAction) => {
    const { isAuthenticated, user } = action.payload

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  LOGIN: (state: AuthState, action: AuthAction) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  SOCIAL_LOGIN: (state: AuthState, action: AuthAction) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  LOGOUT: (state: AuthState) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: AuthState) => ({ ...state }),
  VERIFY_CODE: (state: AuthState) => ({ ...state }),
  RESEND_CODE: (state: AuthState) => ({ ...state }),
  PASSWORD_RECOVERY: (state: AuthState) => ({ ...state }),
  PASSWORD_RESET: (state: AuthState) => ({ ...state }),
}

const reducer = (state: AuthState, action: AuthAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

export const AuthContext = createContext({
  ...initialState,
  login: (variables: LoginVariables) => Promise.resolve(),
  googleLogin: () => Promise.resolve(),
  facebookLogin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: (variables: RegisterVariables) => Promise.resolve(),
  verifyCode: (variables: VerifyEmailVariables) => Promise.resolve(),
  resendCode: (email: string) => Promise.resolve(),
  passwordRecovery: (email: string) => Promise.resolve(),
  passwordReset: (variables: PasswordResetVariables) => Promise.resolve(),
})

export const AuthProvider = (props: any) => {
  const { children } = props
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [apolloClient] = useContext(ApolloClientContext) as any

  const initClients = async () => {
    try {
      // Lấy session theo v6
      const session = await fetchAuthSession()
      const idToken = session.tokens?.idToken
      const jwtToken = idToken?.toString()

      // Không dùng refreshSession ở v6 – Amplify tự xử lý token refresh
      // const refreshToken = session.tokens?.refreshToken; // Chỉ tham khảo nếu cần

      // Lấy claims từ idToken.payload
      const payload = idToken?.payload as Record<string, any> | undefined

      // Hasura claims có thể là object hoặc string JSON tuỳ cấu hình
      const rawHasuraClaims = payload?.['https://hasura.io/jwt/claims']
      const hasuraClaims =
        typeof rawHasuraClaims === 'string'
          ? (() => {
              try {
                return JSON.parse(rawHasuraClaims)
              } catch {
                return undefined
              }
            })()
          : rawHasuraClaims

      const userId: string | null = hasuraClaims?.['x-hasura-user-id'] ?? null

      // Nếu chưa có token => reset link & coi như chưa đăng nhập
      if (!jwtToken) {
        apolloClient.setLink(defaultLinks)
        return { token: null, user: null }
      }

      // Gắn link có Bearer token cho Hasura
      const apolloLink = createAuthApolloLink(jwtToken)
      apolloClient.setLink(apolloLink)

      // Query user theo userId (nếu có)
      let user = null
      if (userId) {
        const {
          data: {
            users: [fetchedUser],
          },
        } = await apolloClient.query({
          query: GET_ONE_USER,
          variables: { id: userId },
          fetchPolicy: 'network-only',
        })
        user = fetchedUser ?? null
      }

      return { token: jwtToken, user }
    } catch (e) {
      console.log({ e })
      apolloClient.setLink(defaultLinks)
      return { token: null, user: null }
    }
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const { user } = await initClients()
        if (user) {
          dispatch({
            type: ActionTypes.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          })
        } else {
          dispatch({
            type: ActionTypes.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (error) {
        dispatch({
          type: ActionTypes.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    initialize()
  }, [])

  const login = async (variables: LoginVariables) => {
    const passwordResetRequiredExceptionCode = 'PasswordResetRequiredException'
    try {
      await signIn({ username: variables.email, password: variables.password })
      const { user } = await initClients()
      dispatch({
        type: ActionTypes.LOGIN,
        payload: {
          user,
        },
      })
    } catch (error: any) {
      console.log({ error })
      if (error?.code === passwordResetRequiredExceptionCode) {
        sessionStorage.setItem('username', variables.email)
        await passwordRecovery(variables.email)
        await router.push(`/authentication/password-reset?type=${PASSWORD_RESET_TYPE.PASSWORD_EXPIRED}`)
      }
      throw {
        ...error,
        code: 'NotAuthorizedException',
        name: 'NotAuthorizedException',
        message: 'Incorrect username or password.',
      }
    }
  }

  useEffect(() => {
    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          const { user } = await initClients()

          dispatch({
            type: ActionTypes.SOCIAL_LOGIN,
            payload: {
              user,
            },
          })
          break
        case 'signOut':
          break
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data)
          break
      }
    })
  }, [])

  const googleLogin = async () => {
    await signInWithRedirect({
      provider: 'Google',
    })
  }

  const facebookLogin = async () => {
    await signInWithRedirect({
      provider: 'Facebook',
    })
  }

  const logout = async () => {
    await signOut()
    apolloClient.setLink(defaultLinks)
    sessionStorage.removeItem('username')
    dispatch({
      type: ActionTypes.LOGOUT,
    })
  }

  const register = async (variables: RegisterVariables) => {
    const res = await apolloClient.mutate({
      mutation: REGISTER_ACCOUNT,
      variables,
    })

    dispatch({
      type: ActionTypes.REGISTER,
    })
    return res
  }

  const verifyCode = async (variables: VerifyEmailVariables) => {
    await apolloClient.mutate({
      mutation: VERIFY_EMAIL,
      variables,
    })

    dispatch({
      type: ActionTypes.VERIFY_CODE,
    })
  }

  const resendCode = async (email: string) => {
    await apolloClient.mutate({
      mutation: RESEND_SIGNUP,
      variables: {
        email,
      },
    })

    dispatch({
      type: ActionTypes.RESEND_CODE,
    })
  }

  const passwordRecovery = async (email: string) => {
    await apolloClient.mutate({
      mutation: FORGOT_PASSWORD,
      variables: {
        email,
      },
    })

    dispatch({
      type: ActionTypes.PASSWORD_RECOVERY,
    })
  }

  const passwordReset = async (variables: PasswordResetVariables) => {
    await apolloClient.mutate({
      mutation: RESET_PASSWORD,
      variables,
    })

    dispatch({
      type: ActionTypes.PASSWORD_RESET,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        googleLogin,
        facebookLogin,
        logout,
        register,
        verifyCode,
        resendCode,
        passwordRecovery,
        passwordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer
