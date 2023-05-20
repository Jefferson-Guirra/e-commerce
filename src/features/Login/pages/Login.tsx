import styles from './styles.module.css'
import { GiBookshelf } from 'react-icons/gi'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { UserForm } from '../components/Form'
export const Login = () => {
  return (
    <>
      <Head>
        <title>Literando | Entrar</title>
      </Head>
      <section className={styles.content}>
        <GiBookshelf className={styles.booksIcon} size={40} color="#001f3f" />
        <h1>Entrar</h1>
        <UserForm />
        <button className={styles.googleLogin} onClick={() => signIn()}>
          <FcGoogle size={25} /> <p>Entrar com Google </p>
        </button>
      </section>
    </>
  )
}
