import * as C from '../../styles/loginForm'
import useForm from '../../Hooks/useForm'
import Input from '../../components/Input'
import { useState, useContext } from 'react'
import { UserContext } from '../../UserContext'
import { GiBookshelf } from 'react-icons/gi'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/router'
import { GET_USER } from '../../services/helper/FirebaseFunctions'
import { getSession } from 'next-auth/react'
import { SessionUser } from '../../Types/User'
import {AiFillEye} from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

const Login = () => {
  const password = useForm('password')
  const router = useRouter()
  const email = useForm('email')
  const [error, setError] = useState<boolean | string>(false)
  const { createCookie, getPurchaseList } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [hidden,setHidden] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const validateInputs = email.validate() && password.validate()
    const { error, validate, user } = await GET_USER(
      email.value,
      password.value
    ).validateLogin

    if (validateInputs && validate && user) {
      const userLogin = {
        username: user.username,
        token: user.id
      }
      createCookie('user', JSON.stringify(userLogin))
      getPurchaseList({ id: user.id, idCollection: 'buyBooks' })
      router.push('/')
    } else if (validateInputs) {
      setError(error)
    }
    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Literando | Entrar</title>
      </Head>

      <C.container>
        <section className="content">
          <GiBookshelf id="booksIcon" size={40} color="#001f3f" />
          <h1>Entrar</h1>
          <form onSubmit={handleSubmit}>
            <Input label="Email:" name="username" type="email" {...email} />

            <div className="passwordContainer">
              <Input
                label="Senha:"
                name="password"
                type={!hidden ? 'password' : 'text'}
                {...password}
              />
              <span
                id="passwordIcon"
                onClick={() => setHidden(state => !state)}
              >
                <AiFillEye size={25} color="#363636" />
              </span>
            </div>
            {error && !email.erro && !password.erro && (
              <p className="userErro">{error}</p>
            )}
            <p>
              Ainda não possui conta?{' '}
              <span
                style={{
                  color: '#001f3f',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onClick={() => router.push('/Login/Cadastrar')}
              >
                Cadastre-se
              </span>
            </p>
            {!loading ? (
              <button type="submit">Entrar</button>
            ) : (
              <button type="submit" disabled>
                Entando...
              </button>
            )}
          </form>
          <button id="googleLogin" onClick={() => signIn()}>
            <FcGoogle size={25} /> Entrar com Google
          </button>
        </section>
      </C.container>
    </>
  )
}

export default Login

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
