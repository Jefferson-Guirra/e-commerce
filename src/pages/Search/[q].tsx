import { GetServerSideProps} from 'next'
import {useEffect, useState} from 'react'
import { GET_BOOKS_PARAMS } from '../../Api'
import { BiBookOpen } from 'react-icons/bi'
import { Books } from '../../Types/Books'
import * as C from '../../styles/search'
import Head from 'next/head'
import Link from 'next/link'

type Params ={
  q:string
}

interface Props{
  books:string,
  q:string
}
const Search = ({books,q}:Props) => {
  const bookFormat:Books = JSON.parse(books)
  const [bookResults,setBookResults]= useState(bookFormat)
  const title = q.replace(/\w+:/g, '')
  const [filter,setFilter] = useState(1)
  const maxPagination = Math.floor((bookFormat.totalItems/15))
  const pagination = Array.from({ length: Number(maxPagination) }, (_, i = 1) => i + 1)
  

  const handlePagination = async (value:number)=>{
    const newBooks = await GET_BOOKS_PARAMS(q, value * 15, 15)
    setFilter(value)
    setBookResults(newBooks)

  }


  useEffect(()=>{
    setBookResults(bookFormat)
  },[q])

  
  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <C.container>
        <div className='title'>
          <BiBookOpen size={40} />
            <h1>{title}</h1>
        </div>
        <section className="containerBook">
          {bookResults.items.map((item, index) => (
            <article key={index} className="contentBook">
              <Link href={`/Book/${item.id}`} className="cardBook">
                <img
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
                  alt={`Imagem do Livro ${item.volumeInfo.title}`}
                />
                <div className="text">
                  <p>{item.volumeInfo.title}</p>
                </div>
                <button>
                  {`A partir de R$ ${item.saleInfo.listPrice?.amount}`}
                </button>
                
              </Link>
            </article>
          ))}
        </section>


        <C.Pagination>
          <div className='containerPagination'>
            {pagination.filter((item)=> item>=filter -1 && item < filter+7).map((item)=><button onClick={()=>handlePagination(item)} key={item}>{item}</button>)}

          </div>
        </C.Pagination>
      </C.container>
    </>
  )
}

export default Search


export const getServerSideProps:GetServerSideProps = async ({query})=>{
  const {q}= query as Params
  console.log(q)
  const books = await GET_BOOKS_PARAMS(q,0,15) as Books
  if(books.totalItems === 0){
    return{
      redirect:{
        destination:'/NotFound',
        permanent:false
        
      }
    }
  }
  return{
    props:{
      books:JSON.stringify(books),
      q
    }
  }
}