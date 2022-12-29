import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserStorage } from '../UserContext'
import { SessionProvider } from 'next-auth/react'




export default function App({ Component, pageProps }: AppProps) {
   
  return (
    <UserStorage>
      <SessionProvider session={pageProps.session}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </UserStorage>
  )
}
