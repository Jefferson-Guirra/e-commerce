import { GetServerSideProps } from 'next'
import { ResetPasswordContainer } from '../../features'
import { ResetProps } from '../../features/reset-password/pages/ResetPassword'
import Head from 'next/head'

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
  return {
    props: {
      accessToken: query.token,
    },
  }
}
