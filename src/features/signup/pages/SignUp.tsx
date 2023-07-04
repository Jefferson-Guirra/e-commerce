import styles from '../../../styles/user-actions.module.css'
import { GiBookshelf } from 'react-icons/gi'
import Head from 'next/head'
import { SignUpForm } from '../components/SignUpForm'
import { useState, useCallback } from 'react'
import { PresentationCover } from '../../../components'
import Link from 'next/link'
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
      <section className={styles.container}>
        <article className={styles.content}>
          <header>
            <GiBookshelf
              className={styles.booksIcon}
              size={37}
              color="#001f3f"
            />
            <h2>Cadastrar</h2>
          </header>
          <SignUpForm handleLoading={handleLoading} loading={loading} />
          <Link href="/Login">
            Já tem uma conta? <span>Entrar</span>
          </Link>
        </article>
        <PresentationCover />
      </section>
    </>
  )
}
