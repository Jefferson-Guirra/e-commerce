import { DefaultJWT } from 'next-auth/jwt'
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken: string | undefined
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's postal address. */
      accessToken: string | undefined
    } & DefaultSession['user']
  }
}
