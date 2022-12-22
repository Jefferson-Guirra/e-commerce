import React from 'react'
import { GetServerSideProps } from 'next'
import { SEARCH_BOOKS_ID } from '../../Api'
import * as C from '../../styles/book'
import { Book } from '../../Types/Books'
import Head from 'next/head'
import { AiFillStar, AiFillHeart } from 'react-icons/ai'
import {BsFillHeartFill} from 'react-icons/bs'


interface Props{
  book:string
}

type Params = {
  q: string
}

const book = ({book}:Props) => {
  const formatBook:Book = JSON.parse(book)
  console.log(formatBook)

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
                src={`https://books.google.com/books/publisher/content/images/frontcover/${formatBook.id}?fife=w340-h400&source=gbs_api`}
                alt={`Imagem do livro ${formatBook.volumeInfo.title}`}
              />
              <div className="textBook">
                <h2>{formatBook.volumeInfo.title}</h2>

                <p className="itemText" id="list">
                  <BsFillHeartFill size={15} color="#999999" /> Minha lista
                </p>
                <div>
                  <span>{'Autor(a): '}</span>
                  {formatBook.volumeInfo.authors.map((item, index) => (
                    <span
                      style={{ color: '#001f3f', fontWeight: 'bold' }}
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="itemText">
                  {formatBook.volumeInfo.averageRating}{' '}
                  <AiFillStar size={18} color="#ffa500" />
                </p>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: formatBook.volumeInfo.description
                  }}
                ></div>
              </div>
            </div>
          </article>
        </section>
      </C.Container>
    </>
  )
}

export default book

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {q}= query as Params
  const book = await SEARCH_BOOKS_ID(q)

  if(!q){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }
  return {
    props: {
      book:JSON.stringify(book)
    }
  }
}
