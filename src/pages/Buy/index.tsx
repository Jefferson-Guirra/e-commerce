import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import Head from 'next/head'
import { BuyListContainer } from '../../features'
import { ApiBook } from '../../utils/book-api'
import { AddBuyBookModel } from '../../server/domain/usecases/book-buy-list/add-book-buy-list'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

const apiBook = new ApiBook()
interface Props {
  accessToken: string
  books: string
}

const Buy = ({ books, accessToken }: Props) => {
  const booksFormat: AddBuyBookModel[] = JSON.parse(books)

  return (
    <>
      <Head>
        <title>Meu Carrinho</title>
      </Head>
      <BuyListContainer
        books={booksFormat}
        accessToken={JSON.parse(accessToken)}
      />
    </>
  )
}

export default Buy

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)

  if (!cookies.accessToken) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }

  const response = await apiBook.get(
    { accessToken: JSON.parse(cookies.accessToken) },
    'buybooklist'
  )

  if (response.statusCode === 401) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }
  if (response.statusCode === 500) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      accessToken: cookies.accessToken,
      books: JSON.stringify(response.body),
    },
  }
}
