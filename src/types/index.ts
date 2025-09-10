export interface LoginVariables {
  email: string
  password: string
}

export interface RegisterVariables {
  email: string
  password: string
  displayName: string
}

export interface VerifyEmailVariables {
  email: string
  code: string
}

export interface PasswordResetVariables {
  email: string
  code: string
  newPassword: string
}

export interface IForcebuild {
  forcebuild: string
}
