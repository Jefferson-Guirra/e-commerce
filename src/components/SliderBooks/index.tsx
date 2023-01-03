import * as C from './styles'
import { Book } from '../../Types/Books'
import { useRouter } from 'next/router'
import Slider from '../Slider'
import { SwiperProps,SwiperSlide } from 'swiper/react'
import { BOOKS_API } from '../../Api'


type Props = {
  bookList:BOOKS_API
}
const settings: SwiperProps = {
  slidesPerView: 6,
  spaceBetween: 5,
  navigation: true,
  breakpoints:{
    1120:{
      slidesPerView:6
    },
    950:{
      slidesPerView:5,
    },
    525:{
      slidesPerView:3
    },
    1:{
      spaceBetween:5,
      slidesPerView:2
    }
  }

}

const SliderBooks = ({bookList}:Props) => {
  
  const router = useRouter()
  return (
    <Slider settings={settings}>
      {bookList.books.map((item, index) => (
        <SwiperSlide key={index}>
          <C.container onClick={() => router.push(`/Book/${item.id}`)}>
            <img
              src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
              alt={`Imagem do Livro ${item.title}`}
            />
            <div className="info">
                <div className='titleBook'>
                  <p>{item.title}</p>
                </div>
                {item?.authors && (
                  <p id="author">{item?.authors[0]}</p>
                )}
              
              <button>
                {`A partir de R$ ${
                  item.price.toFixed(2).toString().replace('.',',')} ` 
                }
              </button>
            </div>
          </C.container>
        </SwiperSlide>
      ))}
    </Slider>
  )
}

export default SliderBooks