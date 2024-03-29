import { GetServerSideProps } from 'next'
import { ResetPasswordContainer } from '../../features'
import { ResetProps } from '../../features/reset-password/pages/ResetPassword'
import Head from 'next/head'
import { Api } from '../../utils/api'

const api = new Api()
const ResetPassword = (props: ResetProps) => {
  return (
    <>
      <Head>
        <title>Literando | Alterar senha</title>
      </Head>
      <ResetPasswordContainer {...props} />
    </>
  )
}

export default ResetPassword

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const response = await api.send('verify-request', 'POST', {
    accessToken: query.token,
  })
  if (response.statusCode === 401) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      accessToken: query.token,
    },
  }
}
