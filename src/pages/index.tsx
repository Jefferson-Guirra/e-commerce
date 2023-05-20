import { GetStaticProps } from 'next'
import { SEARCH_BOOKS_GENRES } from '../Api'
import { HomeContainer } from '../features'
import { IHomeProps } from '../features/@types/IHomeProps'

export default function Home({
  fictionBooks,
  dramaBooks,
  fantasyBooks,
}: IHomeProps) {
  return (
    <HomeContainer
      dramaBooks={dramaBooks}
      fantasyBooks={fantasyBooks}
      fictionBooks={fictionBooks}
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const fictionBooks = JSON.stringify(
    await SEARCH_BOOKS_GENRES(['fiction']).getData
  )
  const dramaBooks = JSON.stringify(
    await SEARCH_BOOKS_GENRES(['drama']).getData
  )
  const fantasyBooks = JSON.stringify(
    await SEARCH_BOOKS_GENRES(['fantasy']).getData
  )
  return {
    props: {
      fictionBooks,
      dramaBooks,
      fantasyBooks,
    },
    revalidate: 60 * 60,
  }
}
