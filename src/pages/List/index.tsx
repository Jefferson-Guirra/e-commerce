import * as C from '../../styles/listBooks'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { GET_BOOKS_LIST } from '../../services/helper/FirebaseFunctions'
import { Book } from '../../Types/Books'
import { Timestamp } from 'firebase/firestore'
import Head from 'next/head'
import Link from 'next/link'

type Time ={
  nanoseconds:number,
  seconds:number

}

type User = {
  username:string,
  token:string
}

interface BookList  extends Book{
  created:Time,
  userId:string
}

interface Props{
  books:string,
  username:string
}

const handleTime = (time:Time) => {
  const timeStamp = new Timestamp(time.seconds, time.nanoseconds)
  const timeFormat = timeStamp.toDate().toLocaleDateString('pt-BR',{
    day:'2-digit',
    month:'2-digit',
    year:'2-digit'
  })
  return timeFormat
}

const List = ({books,username}:Props) => {
  const booksFormat:BookList[] = JSON.parse(books)
  console.log(booksFormat)
  return (
    <>
      <Head>
        <title>Minha Lista | {username}</title>
      </Head>
      <C.container>
        <div className="content">
          <h1 className="title">Minha Lista</h1>
          <C.contentBooks>
            {booksFormat.map(item => (
              <Link className='cardBooks' href={`/Book?q=${item.id}`}>
                <img
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
                  alt={`Imagem do Livro ${item.volumeInfo.title}`}
                />
                <div className='info'>
                  <div className='titleBook'>
                    <p>{item.volumeInfo.title}</p>
                  </div>
                  <p id='author'>{item.volumeInfo.authors[0]}</p>
                  <p>Adicionado: {handleTime(item.created)}</p>
                </div>
              </Link>
            ))}
          </C.contentBooks>
        </div>
      </C.container>
    </>
  )
}

export default List


export const getServerSideProps:GetServerSideProps = async (ctx)=>{
  const user: User | null = GET_COOKIE_USER()
  
  if(!user?.token){
    return{
      redirect:{
        destination:'/Login',
        permanent:false
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
      username:user.username
    }
  }

}
