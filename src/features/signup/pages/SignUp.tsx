import styles from '../../login/pages/styles.module.css'
import { GiBookshelf } from 'react-icons/gi'
import { FcGoogle } from 'react-icons/fc'
import Head from 'next/head'
import { signIn } from 'next-auth/react'
import { SignUpForm } from '../components/SignUpForm'
export const SignUp = () => {
  return (
    <>
      <Head>
        <title>Literando | Cadastrar</title>
      </Head>
      <section className={styles.content}>
        <GiBookshelf className={styles.booksIcon} size={40} color="#001f3f" />
        <h1>Cadastrar</h1>
        <SignUpForm />
        <button className={styles.googleLogin} onClick={() => signIn()}>
          {' '}
          <FcGoogle size={25} /> Entrar com Google
        </button>
      </section>
    </>
  )
}
