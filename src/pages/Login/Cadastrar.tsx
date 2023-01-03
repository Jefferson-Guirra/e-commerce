import useForm from '../../Hooks/useForm'
import Input from '../../components/Input'
import { v4 as uuid } from 'uuid'
import * as C from '../../styles/loginForm'
import { GiBookshelf } from 'react-icons/gi'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import {
  VALIDATE_USER_CREATE,
  CREATE_USER
} from '../../services/helper/FirebaseFunctions'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { SessionUser } from '../../Types/User'

const Cadastrar = () => {
  const router = useRouter()
  const username = useForm('')
  const email = useForm('email')
  const password = useForm('password')
  const [error, setError] = useState<boolean | string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const validateInputs = email.validate() && password.validate()
    const { error, validate } = await VALIDATE_USER_CREATE({
      username: username.value,
      email: email.value
    }).validateUser
    if (validateInputs && validate) {
      const keyUser = uuid()
      await CREATE_USER({
        email: email.value,
        username: username.value,
        id: keyUser,
        password: password.value
      })
      router.push('/Login')
    } else if (validateInputs) {
      setError(error)
    }
    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Literando | Cadastrar</title>
      </Head>
      <C.container>
        <section id="create" className="content">
          <GiBookshelf id="booksIcon" size={40} color="#001f3f" />
          <h1>Cadastrar</h1>
          <form onSubmit={handleSubmit}>
            <Input type="text" name="username" label="Usuário:" {...username} />
            <Input type="email" name="email" label="Email:" {...email} />
            <Input
              type="password"
              name="password"
              label="Senha:"
              {...password}
            />
            {error && <p className="userErro">{error}</p>}
            {!loading ? (
              <button type="submit">Cadastrar</button>
            ) : (
              <button disabled type="submit">Cadastrando...</button>
            )}
            <button id="googleLogin">
              {' '}
              <FcGoogle size={25} /> Entrar com Google
            </button>
          </form>
        </section>
      </C.container>
    </>
  )
}

export default Cadastrar

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = (await getSession({ req })) as SessionUser
  if (session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
