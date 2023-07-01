import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { authOptions } from '../api/auth/[...nextauth]'
import { SignUpContainer } from '../../features'
import { getServerSession } from 'next-auth'
import { handleSession } from '../../utils/handle-next-auth-session'
import nookies from 'nookies'

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
