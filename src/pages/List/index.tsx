import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { GetBooks } from '../../services/db/usecases'
import Head from 'next/head'
import { ListContainer } from '../../features'

type User = {
  username: string
  token: string
}

interface Props {
  books: string
  username: string
}

const List = ({ books, username }: Props) => {
  return (
    <>
      <Head>
        <title>{`Minha Lista | ${username}`}</title>
      </Head>
      <ListContainer books={JSON.parse(books)} />
    </>
  )
}

export default List

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user: User | null = GET_COOKIE_USER()

  if (!user?.token) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }

  const books = JSON.stringify(
    await GetBooks({ id: user.token, idCollection: 'books' })
  )
  function GET_COOKIE_USER() {
    const cookies = parseCookies(ctx)
    if (cookies.user) {
      return JSON.parse(cookies.user) as User
    }
    return null
  }

  return {
    props: {
      books,
      username: user.username,
    },
  }
}
