import { GetStaticProps } from 'next'
import { HomeContainer } from '../features'
import { IHomeProps } from '../features/@types/IHomeProps'
import { GoogleBookApi } from '../services/api/google-book/handle-google-book-apit'

const googleBookApi = new GoogleBookApi()

export default function Home(props: IHomeProps) {
  return <HomeContainer {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  const fictionBooks = JSON.stringify(
    await googleBookApi.searchByGenres(['fiction'])
  )
  const dramaBooks = JSON.stringify(
    await googleBookApi.searchByGenres(['drama'])
  )
  const fantasyBooks = JSON.stringify(
    await googleBookApi.searchByGenres(['fantasy'])
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
