import React from 'react'
import { GetServerSideProps } from 'next'
import { SEARCH_BOOKS_ID, SEARCH_BOOKS_GENRES, BOOKS_API, BOOK_ID_SEARCH } from '../../Api'
import { useState, useEffect, useContext } from 'react'
import * as C from '../../styles/book'
import { doc, getDoc } from 'firebase/firestore'
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
  UPDATE_BOOK_DATABASE,
  REMOVE_BOOK_DATABASE,
  DataBook
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

const Book = ({ book, volums, query, token, validateFavoriteBooks }: Props) => {
  const formatBook: BOOK_ID_SEARCH = JSON.parse(book)
  const formatVolums: BOOKS_API = JSON.parse(volums)
  const [favoriteBooks, setFavoriteBooks] = useState<null | boolean>(null)
  const [showDescription, setSwhowDescription] = useState(false)
  const [loading, setLoading] = useState(false)
  const { updatedBuyList } = useContext(UserContext)

  console.log(formatVolums)

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
    setLoading(true)
    if (token) {
      const docRef = doc(db, 'buyBooks', query + token)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const book = docSnap.data() as DataBook
        UPDATE_BOOK_DATABASE({
          collection: 'buyBooks',
          idBook: query,
          tokenUser: token,
          value: book.qtd
        })
      } else {
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
    setLoading(false)
  }

  const handleExcludeBookFavoriteList = async (idCollection: string) => {
    REMOVE_BOOK_DATABASE({ id: query + token, idCollection: idCollection })
    setFavoriteBooks(null)
  }

  useEffect(() => {
    setFavoriteBooks(validateFavoriteBooks)
  }, [query])

  return (
    <>
      <Head>
        <title>{formatBook.title}</title>
      </Head>
      <C.Container>
        <section className="aboutBook">
          <article className="contentBook">
            <div className="infoBook">
              <img
                src={`https://books.google.com/books/publisher/content/images/frontcover/${formatBook.id}?fife=w340-h800&source=gbs_api`}
                alt={`Imagem do livro ${formatBook.title}`}
              />
              <div className="textBook">
                <h2>{formatBook.title}</h2>
                <p id="subTitle">{formatBook.subtitle}</p>
                {!favoriteBooks ? (
                  <button
                    onClick={() => handleAddBookDatabase(query, 'books')}
                    className="itemText"
                    id="list"
                  >
                    <BsFillHeartFill size={15} color="#999999" /> Minha lista
                  </button>
                ) : (
                  <button
                    onClick={() => handleExcludeBookFavoriteList('books')}
                    className="itemText"
                    id="list"
                  >
                    <BsFillHeartFill size={15} color="#f31" /> Minha lista
                  </button>
                )}
                <div>
                  <span>{'Autor(a): '}</span>
                  {formatBook.authors ? (
                    formatBook.authors.map((item, index) => (
                      <span
                        style={{ color: '#001f3f', fontWeight: 'bold' }}
                        key={index}
                      >
                        {item + '.  '}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: '#001f3f', fontWeight: 'bold' }}>
                      Desconhecido
                    </span>
                  )}
                </div>

                <p className="itemText">
                  {formatBook.avarege
                    ? formatBook.avarege.toFixed(1)
                    : '0.0'}
                  <AiFillStar size={18} color="#ffa500" />
                </p>
                <p className="itemText">Descrição:</p>
                <div
                  className={
                    showDescription ? 'showDescription' : 'description'
                  }
                  dangerouslySetInnerHTML={{
                    __html: formatBook.description
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
                  alt={`Imagem do livro ${formatBook.title}`}
                />
                <div className="textBuy">
                  <div className="resizeTitle">
                    <h2>{formatBook.title}</h2>
                  </div>
                  <div className="itemBuy">
                    <p>Editora: </p>
                    <div className="resizeTitle">
                      <span>{formatBook.publisher}</span>
                    </div>
                  </div>
                  <div className="itemBuy">
                    <p>Ano: </p>
                    <span>
                      {formatBook.publisherDate?.replace(
                        /-\d{2}/g,
                        ''
                      )}
                    </span>
                  </div>
                  <div className="itemBuy">
                    <p>Páginas: </p>
                    <span>{formatBook.pageCount}</span>
                  </div>
                </div>
              </article>

              {formatBook.price ? (
                <article className="actionsBuy">
                  <p className="price">
                    <span>R$</span>
                    {formatBook.price
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')}
                  </p>
                  {!loading ? (
                    <button
                      onClick={handleAddBuyListDatabase}
                      style={{ backgroundColor: '#ffd814' }}
                    >
                      Adicionar ao carrinho
                    </button>
                  ) : (
                    <button disabled style={{ backgroundColor: '#ffd814' }}>
                      Adicionando...
                    </button>
                  )}
                  <button style={{ backgroundColor: '#ffa500' }}>
                    Comprar
                  </button>
                </article>
              ) : (
                <p style={{ color: '#f31', textAlign: 'center' }}>
                  Indisponível
                </p>
              )}
            </C.buyContainer>
          </article>
        </section>
        {formatVolums.totalItems !== 0 && (
          <C.resultBooks>
            <h1 className="title">Títulos Similares</h1>
            <SliderBooks bookList={formatVolums} />
          </C.resultBooks>
        )}
      </C.Container>
    </>
  )
}

export default Book

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { q } = ctx.params as Params
  if (!q) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const token: string | null = GET_COOKIE_USER()
  const bookList = await SEARCH_BOOKS_ID(q)
  const volums = await SEARCH_BOOKS_GENRES(
    bookList.categories
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
      book: JSON.stringify(bookList),
      volums: JSON.stringify(volums),
      query: q,
      token: token,
      validateFavoriteBooks
    }
  }
}
