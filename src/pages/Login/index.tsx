import { getSession } from 'next-auth/react'
import { SessionUser } from '../../Types/User'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { LoginContainer } from '../../features'
import nookies from 'nookies'

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
  const session = (await getSession({ req: ctx.req })) as SessionUser
  const { accessToken } = nookies.get(ctx)

  if (accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  if (session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
