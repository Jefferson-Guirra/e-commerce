import * as C from '../../styles/listBooks'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { GET_BOOKS_LIST, REMOVE_BOOK_LIST } from '../../services/helper/FirebaseFunctions'
import { Book } from '../../Types/Books'
import { BiSearch } from 'react-icons/bi'
import { Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

type Time = {
  nanoseconds: number
  seconds: number
}

type User = {
  username: string
  token: string
}

interface BookList extends Book {
  created: Time
  userId: string,
  idDoc:string
}

interface Props {
  books: string
  username: string
}

const handleTime = (time: Time) => {
  const timeStamp = new Timestamp(time.seconds, time.nanoseconds)
  const timeFormat = timeStamp.toDate().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })
  return timeFormat
}

const List = ({ books, username }: Props) => {
  const booksFormat: BookList[] = JSON.parse(books)
  const [bookList,setBookList] = useState(booksFormat)
  const [input, setInput] = useState('')
  let filtredMovies = []
  filtredMovies = bookList.filter(item =>
    item.volumeInfo.title.toLowerCase().includes(input.toLowerCase())
  ) as BookList[]
  console.log(filtredMovies)
  const handleSubmit = () => {}
  const handleExclude = (id:string) =>{
    REMOVE_BOOK_LIST(id)
    const newBooks = bookList.filter(item=> item.idDoc !== id)
    setBookList(newBooks)
  }
  

  return (
    <>
      <Head>
        <title>Minha Lista | {username}</title>
      </Head>
      <C.container>
        <div className="content">
          <h1 className="title">Minha Lista</h1>
          { bookList.length > 0 ?<C.contentBooks>
            <form onSubmit={handleSubmit} className="search">
              <input
                type="text"
                placeholder="buscar..."
                value={input}
                onChange={({ target }) => setInput(target.value)}
              />
              <span>
                <BiSearch size={30} color="#001f3f" />
              </span>
            </form>

            {filtredMovies.length > 0
              ? filtredMovies.map(item => (
                  <article key={item.id} className="cardBooks">
                    <Link href={`/Book?q=${item.id}`}>
                      <img
                        src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
                        alt={`Imagem do Livro ${item.volumeInfo.title}`}
                      />
                    </Link>
                    <div className="info">
                      <div className="titleBook">
                        <p>{item.volumeInfo.title}</p>
                      </div>
                      <p id="author">{item.volumeInfo.authors[0]}</p>
                      <p>Adicionado: {handleTime(item.created)}</p>
                      <button
                        className="remove"
                        onClick={() => handleExclude(item.idDoc)}
                      >
                        remover
                      </button>
                    </div>
                  </article>
                ))
              : bookList.map(item => (
                  <article key={item.id} className="cardBooks">
                    <Link href={`/Book?q=${item.id}`}>
                      <img
                        src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
                        alt={`Imagem do Livro ${item.volumeInfo.title}`}
                      />
                    </Link>
                    <div className="info">
                      <div className="titleBook">
                        <p>{item.volumeInfo.title}</p>
                      </div>
                      <p id="author">{item.volumeInfo.authors[0]}</p>
                      <p>Adicionado: {handleTime(item.created)}</p>
                      <button
                        className="remove"
                        onClick={() => handleExclude(item.idDoc)}
                      >
                        remover
                      </button>
                    </div>
                  </article>
                ))}
          </C.contentBooks>:
          <p style={{color:'#f31', fontSize:'1.3rem'}}>Lista vazia</p>
          }
        </div>
      </C.container>
    </>
  )
}

export default List

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user: User | null = GET_COOKIE_USER()

  if (!user?.token) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false
      }
    }
  }

  const books = JSON.stringify(await GET_BOOKS_LIST(user.token))
  function GET_COOKIE_USER() {
    const cookies = parseCookies(ctx)
    if (cookies.user) {
      return JSON.parse(cookies.user) as User
    }
    return null
  }

  return {
    props: {
      books,
      username: user.username
    }
  }
}
