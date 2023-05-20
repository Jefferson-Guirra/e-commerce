import { getSession } from 'next-auth/react'
import { SessionUser } from '../../Types/User'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import LoginContainer from '../../features/Login/containers/LoginContainer'

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = (await getSession({ req })) as SessionUser

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
