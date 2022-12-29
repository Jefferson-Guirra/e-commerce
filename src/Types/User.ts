export type SessionUser = {
  expires: string
  id: string
  user: {
    email: string
    image: string
    name: string
  }
}

export type UserCookie = {
  username: string
  token: string
}
