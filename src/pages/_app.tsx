import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Footer, HeaderContainer } from '../components'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { AppProvider } from '../context/context'

const initialOptions = {
  'client-id':
    'AQ4-Jzoq6WQk60K_pvp_krV9qqnTFVtWppdFiwEa3tEOu01bZIXh4Ccd71OHr9GmU3wHHBvM9aAKKCNr',
  currency: 'BRL',
  intent: 'capture',
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <SessionProvider session={pageProps.session}>
        <PayPalScriptProvider options={initialOptions}>
          <HeaderContainer />
          <Component {...pageProps} />
          <Footer />
        </PayPalScriptProvider>
      </SessionProvider>
    </AppProvider>
  )
}
