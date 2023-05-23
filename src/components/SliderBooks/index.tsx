import styles from './styles.module.css'
import { useRouter } from 'next/router'
import Slider from '../Slider'
import Image from 'next/image'
import { SwiperProps, SwiperSlide } from 'swiper/react'
import { BOOKS_API } from '../../Api'

type Props = {
  bookList: BOOKS_API
}
const settings: SwiperProps = {
  slidesPerView: 6,
  spaceBetween: 5,
  navigation: false,
  breakpoints: {
    1120: {
      slidesPerView: 6,
    },
    950: {
      slidesPerView: 5,
    },
    525: {
      slidesPerView: 3,
    },
    1: {
      spaceBetween: 5,
      slidesPerView: 2,
    },
  },
}

const SliderBooks = ({ bookList }: Props) => {
  const router = useRouter()
  return (
    <Slider settings={settings}>
      {bookList.books.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className={styles.container}
            onClick={() => router.push(`/Book/${item.id}`)}
          >
            <div
              style={{ width: '100%', height: '250px', position: 'relative' }}
            >
              <Image
                fill
                src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h300&source=gbs_api`}
                alt={`Imagem do Livro ${item.title}`}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.titleBook}>
                <p>{item.title}</p>
              </div>
              {item?.authors && (
                <p className={styles.author}>{item?.authors[0]}</p>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Slider>
  )
}

export default SliderBooks
