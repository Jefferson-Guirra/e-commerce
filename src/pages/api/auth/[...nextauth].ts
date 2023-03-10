import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'



export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        return true
      } catch (err) {
        console.log('ERRO:')
        return false
      }
    },
    async session({ session, token, user }) {
      return {
        ...session,
        id:token.sub
        
      }
    }
  }
})

