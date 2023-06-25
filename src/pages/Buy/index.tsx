import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import Head from 'next/head'
import { BuyListContainer } from '../../features'
import { Api } from '../../utils/api'
import { AddBuyBookModel } from '../../server/domain/usecases/book-buy-list/add-book-buy-list'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

const apiBook = new Api()
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

  if (!cookies.literando_accessToken) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }

  const response = await apiBook.get(
    { accessToken: JSON.parse(cookies.literando_accessToken) },
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
      accessToken: cookies.literando_accessToken,
      books: JSON.stringify(response.body),
    },
  }
}
