import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { LoginContainer } from '../../features'
import nookies from 'nookies'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { MongoHelper } from '../../server/infra/db/helpers/mongo-helper'

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
    const { accessToken, name, email } = session.user
    nookies.set(ctx, 'literando_accessToken', JSON.stringify(accessToken), {
      maxAge: 86400 * 7,
      page: '/',
    })
    nookies.set(ctx, 'literando_username', JSON.stringify(String(name)), {
      maxAge: 86400 * 7,
      path: '/',
    })
    MongoHelper.uri = process.env.MONGO_URL as string
    const accountsCollection = await MongoHelper.getCollection('accounts')
    const account = await accountsCollection.findOne({ email })
    if (!account) {
      await accountsCollection.insertOne({ email, accessToken, username: name })
    } else {
      await accountsCollection.updateOne(
        { email },
        {
          $set: {
            accessToken,
          },
        }
      )
    }

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
