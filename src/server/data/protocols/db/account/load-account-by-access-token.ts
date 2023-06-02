export interface accountLoginModel {
  username: string
  password: string
  email: string
  id: string
  accessToken: string
}

export interface LoadAccountByAccessTokenRepository {
  load: (accessToken: string) => Promise<accountLoginModel | null>
}
