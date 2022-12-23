import { GetServerSideProps } from 'next'
import React from 'react'
import { GET_BOOKS_PARAMS } from '../../Api'

type Params ={
  q:string
}

interface Props{
book:string
}
const search = ({book}:Props) => {
  const bookFormat = JSON.parse(book)
  return (
    <div>search</div>
  )
}

export default search


export const getServerSideProps:GetServerSideProps = async ({query})=>{
  const {q}= query as Params
  console.log(q)
  const book = JSON.stringify(await GET_BOOKS_PARAMS(q))
  return{
    props:{
      book
    }
  }
}