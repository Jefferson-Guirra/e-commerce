import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
export const authOptions: NextAuthOptions = {
  session: {
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    jwt({ account, token, user }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async signIn({ account }): Promise<string | boolean> {
      try {
        return true
      } catch (err) {
        console.log('ERRO:', err)
        return false
      }
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      return session
    },
  },
}
export default NextAuth(authOptions)
