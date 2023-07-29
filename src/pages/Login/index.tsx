import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { LoginContainer } from '../../features'
import nookies from 'nookies'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { Api } from '../../utils/api'

const api = new Api()
const Login = () => {
  return (
    <>
      <Head>
        <title>Literando | Entrar</title>
      </Head>
      <LoginContainer />
    </>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  const { literando_accessToken } = nookies.get(ctx)

  if (literando_accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (session) {
    try {
      const response = await api.send('next-auth-signup', 'POST', {
        username: session.user.name,
        email: session.user.email,
        accessToken: session.user.accessToken,
      })
      if (response.statusCode === 401) {
        await api.send('next-auth-login', 'PUT', {
          routeName: 'https://literando.onrender.com/api/next-auth-login',
          privateKey: process.env.PRIVATE_KEY_LOGIN_ROUTE,
          email: session.user.email,
          accessToken: session.user.accessToken,
        })
      }
      nookies.set(
        ctx,
        'literando_accessToken',
        JSON.stringify(session.user.accessToken),
        {
          maxAge: 86400 * 7,
          page: '/',
        }
      )

      nookies.set(
        ctx,
        'literando_username',
        JSON.stringify(String(session.user.name)),
        {
          maxAge: 86400 * 7,
          path: '/',
        }
      )

      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    } catch (err) {
      console.error(err)
    }
  }

  return {
    props: {},
  }
}
