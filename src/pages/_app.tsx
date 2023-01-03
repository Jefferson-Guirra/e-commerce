import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserStorage } from '../UserContext'
import { SessionProvider } from 'next-auth/react'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

const id = process.env.PAYPAL_ID  as string

const initialOptions = {
  "client-id":"AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI",
  currency: "BRL",
  intent: "capture"
}



export default function App({ Component, pageProps }: AppProps) {
   
  return (
    <UserStorage>
      <SessionProvider session={pageProps.session}>
        <PayPalScriptProvider options={initialOptions}>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </PayPalScriptProvider>
      </SessionProvider>
    </UserStorage>
  )
}
