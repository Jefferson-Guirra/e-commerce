import styles from '../../login/pages/styles.module.css'
import { GiBookshelf } from 'react-icons/gi'
import { FcGoogle } from 'react-icons/fc'
import Head from 'next/head'
import { signIn } from 'next-auth/react'
import { SignUpForm } from '../components/SignUpForm'
import { useState, useCallback } from 'react'
import { Button } from '../../../components'
export const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const handleLoading = useCallback((state: boolean) => {
    setLoading(state)
  }, [])
  return (
    <>
      <Head>
        <title>Literando | Cadastrar</title>
      </Head>
      <section className={styles.content}>
        <GiBookshelf className={styles.booksIcon} size={40} color="#001f3f" />
        <h1>Cadastrar</h1>
        <SignUpForm handleLoading={handleLoading} loading={loading} />
        <Button
          state={loading}
          size={25}
          className={styles.googleLogin}
          onClick={() => signIn()}
        >
          <FcGoogle size={25} /> Entrar com Google
        </Button>
      </section>
    </>
  )
}
