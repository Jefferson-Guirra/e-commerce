import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { SessionUser } from '../../Types/User'
import { SignUpContainer } from '../../features'

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Literando | Cadastrar</title>
      </Head>
      <SignUpContainer />
    </>
  )
}

export default SignUp

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
