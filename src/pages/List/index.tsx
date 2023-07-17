import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ListContainer } from '../../features'
import { Api } from '../../utils/api'
import nookies from 'nookies'

type User = {
  username: string
  token: string
}

interface Props {
  accessToken: string
  books: string
}

const List = ({ books, accessToken }: Props) => {
  return (
    <>
      <Head>
        <title>{`Minha Lista`}</title>
      </Head>
      <ListContainer
        books={JSON.parse(books)}
        accessToken={JSON.parse(accessToken)}
      />
    </>
  )
}

export default List

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //const user: User | null = GET_COOKIE_USER()
  const { literando_accessToken } = nookies.get(ctx)

  if (!literando_accessToken) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }
  const bookUserApi = new Api()
  const response = await bookUserApi.get(
    {
      accessToken: JSON.parse(literando_accessToken),
    },
    'booklist'
  )

  if (response.statusCode === 401) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      books: JSON.stringify(response.body),
      accessToken: literando_accessToken,
    },
  }
}
