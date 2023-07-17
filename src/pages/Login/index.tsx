import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { LoginContainer } from '../../features'
import nookies from 'nookies'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { MongoHelper } from '../../server/infra/db/helpers/mongo-helper'
import { handleSession } from '../../utils/handle-next-auth-session'

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
      await handleSession({ session })
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
