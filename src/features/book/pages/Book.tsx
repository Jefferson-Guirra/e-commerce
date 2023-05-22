import { useState, useEffect, useCallback } from 'react'
import { SEARCH_BOOKS_GENRES, BOOKS_API } from '../../../Api'
import styles from './styles.module.css'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../services/firebaseConnection'
import Head from 'next/head'
import { AiFillStar } from 'react-icons/ai'
import { BsFillHeartFill } from 'react-icons/bs'
import SliderBooks from '../../../components/SliderBooks'
import { useUserContext } from '../../../UserContext'
import { useRouter } from 'next/router'
import {
  ADD_BOOK_DATABASE,
  UPDATE_BOOK_DATABASE,
  REMOVE_BOOK_DATABASE,
  DataBook,
} from '../../../services/helper/FirebaseFunctions'
import { IBookProps } from '../@types/IBookProps'

export const Book = ({
  book,
  query,
  token,
  validateFavoriteBooks,
}: IBookProps) => {
  const [favoriteBooks, setFavoriteBooks] = useState<null | boolean>(null)
  const [similarBooks, setSimilarBooks] = useState<BOOKS_API | undefined>(
    undefined
  )
  const [showDescription, setShowDescription] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { updatedBuyList } = useUserContext()

  const getSimillarBooks = useCallback(async () => {
    const books = await SEARCH_BOOKS_GENRES(book.categories, book.title).getData

    setSimilarBooks(books)
  }, [])

  const handleAddBookDatabase = async (collection: string) => {
    if (!token) {
      alert('É necessário efetuar o Login')
    } else {
      await ADD_BOOK_DATABASE({
        book: book,
        idBook: query,
        tokenUser: token,
        collection: collection,
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
          value: book.qtd,
        })
      } else {
        updatedBuyList('add')
        ADD_BOOK_DATABASE({
          book: book,
          collection: 'buyBooks',
          idBook: query,
          tokenUser: token,
        })
      }
    } else {
      alert('É necessário efetuar o login.')
    }
    setLoading(false)
  }

  const handleBuy = async () => {
    await handleAddBuyListDatabase()
    if (token) {
      setTimeout(() => router.push('/Buy'), 150)
    }
  }

  const handleExcludeBookFavoriteList = async (idCollection: string) => {
    REMOVE_BOOK_DATABASE({ id: query + token, idCollection: idCollection })
    setFavoriteBooks(null)
  }

  useEffect(() => {
    setFavoriteBooks(validateFavoriteBooks)
    getSimillarBooks()
  }, [query])
  return (
    <>
      <Head>
        <title>{book.title}</title>
      </Head>
      <section className={styles.aboutBook}>
        <article className={styles.contentBook}>
          <div className={styles.infoBook}>
            <img
              src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h400&source=gbs_api`}
              alt={`Imagem do livro ${book.title}`}
            />
            <div className={styles.textBook}>
              <h2>{book.title}</h2>
              <p className={styles.subTitle}>{book.subtitle}</p>
              {!favoriteBooks ? (
                <button
                  onClick={() => handleAddBookDatabase('books')}
                  className={`${styles.itemText} ${styles.list}`}
                >
                  <BsFillHeartFill size={15} color="#999999" /> Minha lista
                </button>
              ) : (
                <button
                  onClick={() => handleExcludeBookFavoriteList('books')}
                  className={`${styles.itemText} ${styles.list}`}
                >
                  <BsFillHeartFill size={15} color="#f31" /> Minha lista
                </button>
              )}
              <div>
                <span>{'Autor(a): '}</span>
                {book.authors ? (
                  book.authors.map((item, index) => (
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

              <p className={styles.itemText}>
                {book.avarege ? book.avarege.toFixed(1) : '0.0'}
                <AiFillStar size={18} color="#ffa500" />
              </p>
              <p className={styles.itemText}>Descrição:</p>
              <div
                className={
                  showDescription
                    ? `${styles.showDescription}`
                    : `${styles.description}`
                }
                dangerouslySetInnerHTML={{
                  __html: book.description,
                }}
              ></div>
              <button
                onClick={() => setShowDescription((state) => !state)}
                className={styles.buttonShowDescription}
              >
                ler mais...
              </button>
            </div>
          </div>
          <div className={styles.buyContainer}>
            <span className={styles.alert}>Menor preço</span>
            <article className={styles.infoBuy}>
              <img
                src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h200&source=gbs_api`}
                height="150px"
                alt={`Imagem do livro ${book.title}`}
              />
              <div className={styles.textBuy}>
                <div className={styles.resizeTitle}>
                  <h2>{book.title}</h2>
                </div>
                <div className={styles.itemBuy}>
                  <p>Editora: </p>
                  <div className={styles.resizeTitle}>
                    <span>{book.publisher}</span>
                  </div>
                </div>
                <div className={styles.itemBuy}>
                  <p>Ano: </p>
                  <span>{book.publisherDate?.replace(/-\d{2}/g, '')}</span>
                </div>
                <div className={styles.itemBuy}>
                  <p>Páginas: </p>
                  <span>{book.pageCount}</span>
                </div>
              </div>
            </article>

            {book.price ? (
              <article className={styles.actionsBuy}>
                <p className={styles.price}>
                  <span>R$</span>
                  {book.price.toFixed(2).toString().replace('.', ',')}
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
                <button
                  onClick={handleBuy}
                  style={{ backgroundColor: '#ffa500' }}
                >
                  Comprar
                </button>
              </article>
            ) : (
              <p style={{ color: '#f31', textAlign: 'center' }}>Indisponível</p>
            )}
          </div>
        </article>
      </section>
      {similarBooks?.totalItems !== 0 && similarBooks && (
        <section className={styles.resultBooks}>
          <h1 className={styles.title}>Títulos Similares</h1>
          <SliderBooks bookList={similarBooks} />
        </section>
      )}
    </>
  )
}
