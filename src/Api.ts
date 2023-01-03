import { Books } from "./Types/Books"

const apiKey = 'AIzaSyBMfQlCfLea2FkXRsq7KMd0JrqN2YkmyDo'

export interface BOOK_API {
  authors: string[],
  title: string,
  price: number,
  id:string,
}

export interface BOOKS_API {
  totalItems:number,
  books: BOOK_API[]
}


export async function RELEVANCE_BOOKS (){
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=orderBy:relevance&key=${apiKey}`
  )
  const data = response.json()
  return data
}

export async function SEARCH_BOOKS_ID(id :string){
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  )
  const data = response.json()
  return data
}

export function SEARCH_BOOKS_GENRES(genre: string[],title?:string) {
    async function searchTitleGenre () {
      const genreFormat = genre.reduce((acc,v)=> acc + `+${v}`)
      const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${genreFormat}&maxResults=40&filter=paid-ebooks&orderBy=relevance&key=${apiKey}`
    )
      const data : Books = await response.json()
      const booksList:BOOK_API[] = data?.items?.map(item=>{
        const book = {
          id:item.id,
          authors:item.volumeInfo.authors,
          title:item.volumeInfo.title,
          price:item.saleInfo.listPrice.amount,
          totalItems:data.totalItems
        }
        return book
      })
      const booksApi: BOOKS_API = {
        totalItems: data.totalItems,
        books:booksList
      }
      return booksApi
    }

    async function init(){
      let books :BOOKS_API = await searchTitleGenre()
      if(books.totalItems === 0 && title){
        books = await  GET_VOLUME_TITLE_BOOKS(title.replace(/\s\w+/g,''))
      }
      return books
    }
    const getData = init()
  return{
    getData
  }
  
}

export async function NEW_BOOKS(){
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=orderBy:newest&key=${apiKey}`
  )
  const data = response.json()
  return data
}

export async function GET_VOLUME_TITLE_BOOKS(title:string,){
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=40&filter=paid-ebooks`
  )
  const data:Books = await response.json()
  
  const books: BOOK_API[] = data.items.map(item => {
    const book = {
      id:item.id,
      authors: item.volumeInfo.authors,
      title: item.volumeInfo.title,
      price: item.saleInfo.listPrice.amount,
          totalItems:data.totalItems

    }
    return book
  }) 

  const booksApi:BOOKS_API ={
    totalItems:data.totalItems,
    books
  }
  return booksApi
}

export async function GET_BOOKS_PARAMS(params: string, index: number = 0,maxResults:number = 40) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${params}&startIndex=${index}&filter=paid-ebooks&maxResults=${maxResults}&key=${apiKey}`
  )
  const data: Books = await response.json()
  const booksList: BOOK_API[] = data.items.map(item => {
    const book = {
      id: item.id,
      authors: item.volumeInfo.authors,
      title: item.volumeInfo.title,
      price: item.saleInfo.listPrice.amount
    }
    return book
  })
    const booksApi: BOOKS_API = {
      totalItems: data.totalItems,
      books:booksList
    }
    return booksApi
}


