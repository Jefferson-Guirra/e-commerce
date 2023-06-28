import { useCallback, useState } from 'react'
import styles from './styles.module.css'
import { GiBookshelf } from 'react-icons/gi'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { UserForm } from '../components/Form'
import { Button } from '../../../components'
export const Login = () => {
  const [loading, setLoading] = useState(false)
  const handleLoading = useCallback((state: boolean) => {
    setLoading(state)
  }, [])

  const handleSignIn = () => {
    try {
      setLoading(true)
      signIn()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Literando | Entrar</title>
      </Head>
      <section className={styles.content}>
        <GiBookshelf className={styles.booksIcon} size={40} color="#001f3f" />
        <h1>Entrar</h1>
        <UserForm loading={loading} handleLoading={handleLoading} />

        <Button
          state={loading}
          size={25}
          className={styles.googleLogin}
          onClick={handleSignIn}
        >
          <FcGoogle size={25} /> <p>Entrar com Google </p>
        </Button>
      </section>
    </>
  )
}
