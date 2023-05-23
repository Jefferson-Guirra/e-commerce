import { GetStaticProps } from 'next'
import { SEARCH_BOOKS_GENRES } from '../services/api/usecases'
import { HomeContainer } from '../features'
import { IHomeProps } from '../features/@types/IHomeProps'

export default function Home(props: IHomeProps) {
  return <HomeContainer {...props} />
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
