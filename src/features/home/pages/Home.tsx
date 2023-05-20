import React from 'react'
import Slider from '../../../components/Slider'
import styles from './styles.module.css'
import { SwiperSlide, SwiperProps } from 'swiper/react'
import { BOOKS_API } from '../../../Api'
import Image from 'next/image'
import { IHomeProps } from '../../@types/IHomeProps'
import { HomeBooks, IHomeBooksProps } from '../components/HomeBooks'

const handleFormatBook = (bookList: string) => {
  return JSON.parse(bookList) as BOOKS_API
}

export function Home({ fictionBooks, dramaBooks, fantasyBooks }: IHomeProps) {
  const BooksFormat: IHomeBooksProps[] = [
    { title: 'Ficção', bookList: handleFormatBook(fictionBooks) },
    { title: 'Drama', bookList: handleFormatBook(dramaBooks) },
    { title: 'Fantasia', bookList: handleFormatBook(fantasyBooks) },
  ]
  const settings: SwiperProps = {
    //config swiper slide
    slidesPerView: 1,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { clickable: true },
  }

  return (
    <>
      <section className={styles.sliderPresentation}>
        <Slider settings={settings}>
          <SwiperSlide>
            <div
              style={{ width: '100%', height: '350px', position: 'relative' }}
            >
              <Image
                quality={100}
                priority
                fill
                style={{ objectPosition: 'center' }}
                src="/images/propaganda-1.png"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{ width: '100%', height: '350px', position: 'relative' }}
            >
              <Image
                priority
                quality={100}
                fill
                style={{ objectPosition: 'center' }}
                src="/images/propaganda-2.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{ width: '100%', height: '350px', position: 'relative' }}
            >
              <Image
                priority
                quality={100}
                style={{ objectPosition: 'center' }}
                fill
                src="/images/propaganda-3.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Slider>
      </section>
      {BooksFormat.map((book) => (
        <HomeBooks
          key={book.title}
          title={book.title}
          bookList={book.bookList}
        />
      ))}
    </>
  )
}
