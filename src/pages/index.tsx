import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import * as C from '../styles/home'
import Slider from '../components/Slider'
import { SwiperSlide, SwiperProps } from 'swiper/react'
import {SEARCH_BOOKS_GENRES} from '../Api'
import { Book, Books } from '../Types/Books'
import {BiBookOpen} from 'react-icons/bi'
import SliderBooks from '../components/SliderBooks'

interface Props {
  book?: Book
  fictionBooks:Books
  dramaBooks:Books,
  fantasyBooks:Books
}




export default function Home({fictionBooks,dramaBooks,fantasyBooks}:Props) {
  
    const settings : SwiperProps = {
      //config swiper slide
      slidesPerView: 1,
      autoplay:{delay:4000,disableOnInteraction:false},
      pagination:{clickable:true}
    }
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <C.Container>
        <section className="sliderPresentation">
          <Slider settings={settings}>
            <SwiperSlide>
              <img src="/images/propaganda-1.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/propaganda-2.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/propaganda-3.jpg" alt="" />
            </SwiperSlide>
          </Slider>
        </section>

        <section className="newBooks">
          <div className="title">
            <BiBookOpen size={40} />
            <h1>Ficção</h1>
          </div>
          <SliderBooks books={fictionBooks} />
        </section>

        <section className="dramaBooks">
          <div className="title">
            <BiBookOpen size={45} />
            <h1>Dramas</h1>
          </div>
          <SliderBooks books={dramaBooks} />
        </section>

        <section className="fantasyBooks">
          <div className="title">
            <BiBookOpen size={40} />
            <h1>Fantasia</h1>
          </div>
          <SliderBooks books={fantasyBooks} />
        </section>
      </C.Container>
    </>
  )
}

export const getStaticProps:GetStaticProps = async () =>{
  const fictionBooks = await SEARCH_BOOKS_GENRES(['fiction']).getData
  const dramaBooks = await SEARCH_BOOKS_GENRES(['drama']).getData
  const fantasyBooks = await SEARCH_BOOKS_GENRES(['fantasy']).getData
  return{
    props:{
      fictionBooks,
      dramaBooks,
      fantasyBooks
    },
    revalidate: 60 * 60
  }
}


