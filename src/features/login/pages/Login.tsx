import { useCallback, useState } from 'react'
import styles from '../../../styles/user-actions.module.css'
import { GiBookshelf } from 'react-icons/gi'
import Head from 'next/head'
import Link from 'next/link'
import { PresentationCover } from '../../../components'
import { LoginForm } from '../components/form/LoginForm'

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const handleLoading = useCallback((state: boolean) => {
    setLoading(state)
  }, [])

  return (
    <>
      <Head>
        <title>Literando | Entrar</title>
      </Head>
      <section className={styles.container}>
        <article className={styles.content}>
          <header>
            <GiBookshelf
              className={styles.booksIcon}
              size={37}
              color="#001f3f"
            />
            <h2>Entrar na conta</h2>
          </header>
          <LoginForm handleLoading={handleLoading} loading={loading} />
          <Link href="/SignUp">
            Não tem uma conta? <span>Inscreva-se</span>
          </Link>
        </article>
        <PresentationCover url="/images/presentation-cover.jpg" />
      </section>
    </>
  )
}
