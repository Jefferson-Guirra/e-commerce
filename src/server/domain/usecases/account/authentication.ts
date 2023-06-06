export interface AuthenticationModel {
  email: string
  password: string
}

export interface Authentication {
  auth: (account: AuthenticationModel) => Promise<string | null>
}
