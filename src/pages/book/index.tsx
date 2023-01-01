import React from 'react'
import { GetServerSideProps } from 'next'
import { SEARCH_BOOKS_ID, SEARCH_BOOKS_GENRES } from '../../Api'
import { useState, useEffect,useContext } from 'react'
import * as C from '../../styles/book'
import {doc,getDoc} from 'firebase/firestore'
import { Book, Books } from '../../Types/Books'
import { db } from '../../services/firebaseConnection'
import Head from 'next/head'
import { AiFillStar } from 'react-icons/ai'
import { BsFillHeartFill } from 'react-icons/bs'
import SliderBooks from '../../components/SliderBooks'
import { parseCookies } from 'nookies'
import { UserContext } from '../../UserContext'

import {
  GET_BOOK_DATABASE,
  ADD_BOOK_DATABASE,
  UPDATE_BOOK_DATABASE
} from '../../services/helper/FirebaseFunctions'

interface Props {
  book: string
  volums: string
  query: string
  user: string
  validateFavoriteBooks: boolean
  token: string
}

type Params = {
  q: string
}

const Book = ({
  book,
  volums,
  query,
  token,
  validateFavoriteBooks,
  
}: Props) => {
  const formatBook: Book = JSON.parse(book)
  const formatVolums: Books = JSON.parse(volums)
  const [favoriteBooks, setFavoriteBooks] = useState<null | boolean>(null)
  const [showDescription, setSwhowDescription] = useState(false)
  const { updatedBuyList } = useContext(UserContext)



  const handleAddBookDatabase = async (idBook: string, collection: string) => {
    if (!token) {
      alert('É necessario efetuar o Login')
    } else {
      await ADD_BOOK_DATABASE({
        book: formatBook,
        idBook: query,
        tokenUser: token,
        collection: collection
      })
      setFavoriteBooks(true)
    }
  }

  const handleAddBuyListDatabase = async () => {
    if (token) {
      const docRef = doc(db, 'buyBooks', query + token)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        UPDATE_BOOK_DATABASE({
            collection: 'buyBooks',
            idBook: query,
            tokenUser: token
          })

      }
      else{
        updatedBuyList('add')
        ADD_BOOK_DATABASE({
          book: formatBook,
          collection: 'buyBooks',
          idBook: query,
          tokenUser: token
        })
      }

    } else {
      alert('É necessario efetuar o login.')
    }
  }

  useEffect(() => {
    setFavoriteBooks(validateFavoriteBooks)
  }, [query])

  return (
    <>
      <Head>
        <title>{formatBook.volumeInfo.title}</title>
      </Head>
      <C.Container>
        <section className="aboutBook">
          <article className="contentBook">
            <div className="infoBook">
              <img
                src={`https://books.google.com/books/publisher/content/images/frontcover/${formatBook.id}?fife=w340-h800&source=gbs_api`}
                alt={`Imagem do livro ${formatBook.volumeInfo.title}`}
              />
              <div className="textBook">
                <h2>{formatBook.volumeInfo.title}</h2>
                <p id="subTitle">{formatBook.volumeInfo.subtitle}</p>
                {!favoriteBooks ? (
                  <button
                    onClick={() => handleAddBookDatabase(query, 'books')}
                    className="itemText"
                    id="list"
                  >
                    <BsFillHeartFill size={15} color="#999999" /> Minha lista
                  </button>
                ) : (
                  <button className="itemText" id="list">
                    <BsFillHeartFill size={15} color="#f31" /> Minha lista
                  </button>
                )}
                <div>
                  <span>{'Autor(a): '}</span>
                  {formatBook.volumeInfo.authors ? (
                    formatBook.volumeInfo.authors.map((item, index) => (
                      <span
                        style={{ color: '#001f3f', fontWeight: 'bold' }}
                        key={index}
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: '#001f3f', fontWeight: 'bold' }}>
                      Desconhecido
                    </span>
                  )}
                </div>

                <p className="itemText">
                  {formatBook.volumeInfo.averageRating
                    ? formatBook.volumeInfo.averageRating.toFixed(1)
                    : '0.0'}
                  <AiFillStar size={18} color="#ffa500" />
                </p>
                <p className="itemText">Descrição:</p>
                <div
                  className={
                    showDescription ? 'showDescription' : 'description'
                  }
                  dangerouslySetInnerHTML={{
                    __html: formatBook.volumeInfo.description
                  }}
                ></div>
                <button
                  onClick={() => setSwhowDescription(state => !state)}
                  className="buttonShowDescription"
                >
                  ler mais...
                </button>
              </div>
            </div>
            <C.buyContainer>
              <span className="alert">Menor preço</span>
              <article className="infoBuy">
                <img
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${formatBook.id}?fife=w340-h600&source=gbs_api`}
                  height="150px"
                  alt={`Imagem do livro ${formatBook.volumeInfo.title}`}
                />
                <div className="textBuy">
                  <h2>{formatBook.volumeInfo.title}</h2>
                  <div className="itemBuy">
                    <p>Editora: </p>
                    <span>{formatBook.volumeInfo.publisher}</span>
                  </div>
                  <div className="itemBuy">
                    <p>Ano: </p>
                    <span>
                      {formatBook.volumeInfo.publishedDate?.replace(
                        /-\d{2}/g,
                        ''
                      )}
                    </span>
                  </div>
                  <div className="itemBuy">
                    <p>Páginas: </p>
                    <span>{formatBook.volumeInfo.pageCount}</span>
                  </div>
                </div>
              </article>
              <article className="actionsBuy">
                <p className="price">
                  <span>R$</span>
                  {formatBook.saleInfo.listPrice.amount}
                </p>
                <button
                  onClick={handleAddBuyListDatabase}
                  style={{ backgroundColor: '#ffd814' }}
                >
                  Adicionar ao carrinho
                </button>
                <button style={{ backgroundColor: '#ffa500' }}>Comprar</button>
              </article>
            </C.buyContainer>
          </article>
        </section>
        {formatVolums.totalItems !== 0 && (
          <C.resultBooks>
            <h1 className="title">Títulos Similares</h1>
            <SliderBooks books={formatVolums} />
          </C.resultBooks>
        )}
      </C.Container>
    </>
  )
}

export default Book

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { q } = ctx.query as Params
  if (!q) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const token: string | null = GET_COOKIE_USER()
  const book: Book = await SEARCH_BOOKS_ID(q)
  const volums = await SEARCH_BOOKS_GENRES(
    book.volumeInfo.categories,
    book.volumeInfo.title
  ).getData


  function GET_COOKIE_USER() {
    const cookies = parseCookies(ctx)
    if (cookies.user) {
      return JSON.parse(cookies.user).token as string
    }
    return null
  }

  const validateFavoriteBooks = token
    ? await GET_BOOK_DATABASE({
        idBook: q,
        collection: 'books',
        tokenUser: token
      })
    : false

  return {
    props: {
      book: JSON.stringify(book),
      volums: JSON.stringify(volums),
      query: q,
      token: token,
      validateFavoriteBooks
    }
  }
}
