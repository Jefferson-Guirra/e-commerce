import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProvider } from '../context/context'

const initialOptions = {
  'client-id':
    'AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI',
  currency: 'BRL',
  intent: 'capture',
}

function Loading() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        document.body.style.overflow = 'hidden'
        setLoading(true)
      }
    }
    const handleComplete = (url: string) => {
      if (url !== router.asPath) {
        document.body.style.overflow = 'auto'
        setLoading(false)
      }
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.events])
  if (loading)
    return (
      <div className="bookWrapper">
        <div className="loader book">
          <figure className="page"></figure>
          <figure className="page"></figure>
          <figure className="page"></figure>
        </div>
      </div>
    )
  else return null
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <SessionProvider session={pageProps.session}>
        <PayPalScriptProvider options={initialOptions}>
          <NavBar />
          <>
            <Loading />
            <Component {...pageProps} />
          </>
          <Footer />
        </PayPalScriptProvider>
      </SessionProvider>
    </AppProvider>
  )
}
