import { GetServerSideProps } from 'next'
import React from 'react'
import { GET_BOOKS_PARAMS } from '../../Api'
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
const search = ({books,q}:Props) => {
  const bookFormat:Books = JSON.parse(books)
  return (
    <>
      <Head>
        <title>
          {q.replace(/\w+:/g, '')}
        </title>
      </Head>
      <C.container>
        <section className="containerBook">
          {bookFormat.items.map((item, index) => (
            <article key={index} className="contentBook">
              <Link href={`/book?q=${item.id}`} className="cardBook">
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
      </C.container>
    </>
  )
}

export default search


export const getServerSideProps:GetServerSideProps = async ({query})=>{
  const {q}= query as Params
  console.log(q)
  const books = JSON.stringify(await GET_BOOKS_PARAMS(q))
  return{
    props:{
      books,
      q
    }
  }
}