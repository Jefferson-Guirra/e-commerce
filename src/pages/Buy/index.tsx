import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { IDataBook } from '../../services/db/@types'
import { GetBooks } from '../../services/db/usecases'
import { UserCookie } from '../../Types/User'
import Head from 'next/head'
import { BuyListContainer } from '../../features'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

interface Props {
  books: string
  user: UserCookie
}

const Buy = ({ books, user }: Props) => {
  const booksFormat: IDataBook[] = JSON.parse(books)

  return (
    <>
      <Head>
        <title>{`Meu Carrinho | ${user.username}`}</title>
      </Head>
      <BuyListContainer books={booksFormat} />
    </>
  )
}

export default Buy

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)

  if (!cookies.user) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }
  const user = JSON.parse(cookies.user) as UserCookie
  const books = JSON.stringify(
    await GetBooks({ id: user.token, idCollection: 'buyBooks' })
  )

  return {
    props: {
      books,
      user,
    },
  }
}
