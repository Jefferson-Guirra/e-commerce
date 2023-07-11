import styles from './styles.module.css'
import { useRouter } from 'next/router'
import { Slider } from '../Slider/Slider'
import Image from 'next/image'
import { SwiperProps, SwiperSlide } from 'swiper/react'
import { GoogleBooksFormat } from '../../services/api/google-book/@types/google-books-format'

type Props = {
  bookList: GoogleBooksFormat
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

export const SliderBooks = ({ bookList }: Props) => {
  const router = useRouter()
  return (
    <Slider settings={settings}>
      {bookList.items.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className={styles.container}
            onClick={() => router.push(`/Book/${item.id}`)}
          >
            <Image
              style={{ width: '100%', height: '250px' }}
              width={200}
              height={0}
              src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h300&source=gbs_api`}
              alt={`Imagem do Livro ${item.title}`}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
            />

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
