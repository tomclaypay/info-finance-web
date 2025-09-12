const awsmobile = {
  aws_project_region: 'ap-southeast-1',
  aws_cognito_region: 'ap-southeast-1',
  aws_user_pools_id: 'ap-southeast-1_d7U8Gk5lg',
  aws_user_pools_web_client_id: '4fbn6s87f3kdhg7mb4ja4emrp5',
  oauth: {
    domain: 'infofinance.auth.ap-southeast-1.amazoncognito.com',
    scope: ['aws.cognito.signin.user.admin', 'email', 'openid', 'phone', 'profile'],
    redirectSignIn: 'http://localhost:3000/,https://infofinance.com/,https://info-finance-web.vercel.app/',
    redirectSignOut: 'http://localhost:3000/,https://infofinance.com/,https://info-finance-web.vercel.app/',
    responseType: 'token',
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: ['FACEBOOK', 'GOOGLE'],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ['EMAIL', 'PHONE_NUMBER'],
}

export default awsmobile
