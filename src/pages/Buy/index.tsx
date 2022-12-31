import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import * as C from '../../styles/buyList'
import {useState,useEffect} from 'react'
import { IoClose } from 'react-icons/io5'
import { GET_BOOKS_BUY_LIST, REMOVE_BOOK_DATABASE } from '../../services/helper/FirebaseFunctions'
import { Book } from '../../Types/Books'
import { UserCookie } from '../../Types/User'
import Link from 'next/link'

interface Props{
  books:string
}

interface BookFormat extends Book{
  docId:string
}

const Buy = ({books}:Props) => {
  const booksFormat: BookFormat[] = JSON.parse(books)
  const price = booksFormat.reduce(
    (acc, v) => acc + v.saleInfo.listPrice.amount
  ,0)
  const [bookList, setBookList] = useState(booksFormat)

  const handleExclude = (id:string)=>{
    REMOVE_BOOK_DATABASE({id,idCollection:'buyBooks'})
    const newBooks = bookList.filter(item=> item.docId !== id)
    setBookList(newBooks)

  }
  return (
    <C.container>
      <div className="content">
        <h1>Meu Carrinho</h1>

        {bookList.map(item => (
          <C.cardContent key={item.docId}>
            <h2>{item.volumeInfo.publisher}</h2>
            <article className="infoBook">
              <div className="img">
                <img
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
                  height="150px"
                  alt={`Imagem do livro ${item.volumeInfo.title}`}
                />
              </div>
              <article className="dataBook">
                <div className="header">
                  <div className='bookTitle'>
                    <p>{item.volumeInfo.title}</p>
                  </div>
                  <div className="actions">
                    <Link href={`/Book?q=${item.id}`}>
                      vizualizar livro
                    </Link>
                    <p>
                      R$:{' '}
                      {item.saleInfo.listPrice.amount
                        .toString()
                        .replace('.', ',')}
                    </p>
                    <button onClick={()=> handleExclude(item.docId)}>
                      <IoClose size={20} color="#363636" />
                    </button>
                  </div>
                </div>
                <div className="textInfo">
                  <p>Ano: </p>
                  <span>
                    {item.volumeInfo.publishedDate.replace(/\-\d+/g, '')}
                  </span>
                </div>
                <div className="textInfo">
                  <p className="textInfo">Páginas: </p>
                  <span>{item.volumeInfo.pageCount}</span>
                </div>
                <div className="textInfo">
                  <p>Idioma: </p>
                  <span>{item.volumeInfo.language}</span>
                </div>
              </article>
            </article>
            <C.buyInfoCard>
              <h2>Entrega Básica</h2>
              <div className="infoBuy">
                <span id='free'>Frete grátis </span>
                <p>neste vendedor nas compras a partir de</p>
                <span> R$ 100,00.</span>
              </div>
            </C.buyInfoCard>
          </C.cardContent>
        ))}
      </div>
      <article className="price">
        <p>Total do carrinho: R${price.toString().replace('.', ',')}</p>
      </article>
      <article className="checkout">
        <button id='addButton'>ESCOLHER MAIS LIVROS</button>
        <button id='buyButton'>FINALIZAR PEDIDO</button>
      </article>
    </C.container>
  )
}

export default Buy

export const getServerSideProps:GetServerSideProps = async (ctx)=>{
  const cookies = parseCookies(ctx)
  if(!cookies.user){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }
  const user = JSON.parse(cookies.user) as UserCookie
  const books = JSON.stringify(await GET_BOOKS_BUY_LIST({id:user.token,idCollection:'buyBooks'}))
  
  
  return{
    props:{
      books
    }
  }
}
