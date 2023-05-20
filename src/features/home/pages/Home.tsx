import React from 'react'
import Slider from '../../../components/Slider'
import styles from './styles.module.css'
import { SwiperSlide, SwiperProps } from 'swiper/react'
import { BOOKS_API } from '../../../Api'
import { BiBookOpen } from 'react-icons/bi'
import SliderBooks from '../../../components/SliderBooks'
import Image from 'next/image'
import { IHomeProps } from '../../@types/IHomeProps'

export function Home({ fictionBooks, dramaBooks, fantasyBooks }: IHomeProps) {
  const settings: SwiperProps = {
    //config swiper slide
    slidesPerView: 1,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { clickable: true },
  }

  const handleFormatBook = (bookList: string) => {
    return JSON.parse(bookList) as BOOKS_API
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

      <section className={styles.newBooks}>
        <div className="title">
          <BiBookOpen size={40} />
          <h1>Ficção</h1>
        </div>
        <SliderBooks bookList={handleFormatBook(fictionBooks)} />
      </section>

      <section className={styles.dramaBooks}>
        <div className="title">
          <BiBookOpen size={45} />
          <h1>Dramas</h1>
        </div>
        <SliderBooks bookList={handleFormatBook(dramaBooks)} />
      </section>

      <section className={styles.fantasyBooks}>
        <div className="title">
          <BiBookOpen size={40} />
          <h1>Fantasia</h1>
        </div>
        <SliderBooks bookList={handleFormatBook(fantasyBooks)} />
      </section>
    </>
  )
}
