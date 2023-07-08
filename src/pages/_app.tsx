import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Footer, HeaderContainer } from '../components'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { AppProvider } from '../context/context'
import { Lato } from 'next/font/google'
const lato = Lato({
  subsets: ['latin'],
  style: 'normal',
  weight: ['300', '400', '700'],
})
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
          <main className={lato.className}>
            <Component {...pageProps} />
          </main>
          <Footer />
        </PayPalScriptProvider>
      </SessionProvider>
    </AppProvider>
  )
}
