import { Books, Book } from './Types/Books'

const apiKey = 'AIzaSyBMfQlCfLea2FkXRsq7KMd0JrqN2YkmyDo'

export interface BOOK_ID_SEARCH {
  title: string
  language: string
  price: number
  id: string
  publisher: string
  publisherDate: string
  authors: string[]
  categories: string[]
  pageCount: number
  avarege: number
  subtitle: string | undefined
  description: string
}

export type BOOK_API = {
  title: string
  id: string
  price: number
  language: string
  publisher: string
  pageCount: number
  publisherDate: string
  authors: string[]
}

export interface BOOKS_API {
  totalItems: number
  books: BOOK_API[]
}

export async function RELEVANCE_BOOKS() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=orderBy:relevance&key=${apiKey}`
    )
    const data = response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export async function SEARCH_BOOKS_ID(id: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    )
    const data: Book = await response.json()
    
    const booksList: BOOK_ID_SEARCH = {
      title: data.volumeInfo.title,
      language: data.volumeInfo.language,
      price: data.saleInfo.listPrice.amount,
      id: data.id,
      publisher: data.volumeInfo.publisher,
      publisherDate: data.volumeInfo.publishedDate,
      authors: data.volumeInfo.authors,
      categories: data.volumeInfo.categories,
      pageCount: data.volumeInfo.pageCount,
      avarege: data.volumeInfo.averageRating,
      subtitle: data.volumeInfo.subtitle,
      description: data.volumeInfo.description
    }
    return booksList
  } catch (err) {
    console.log(err)
  }
}

export function SEARCH_BOOKS_GENRES(genre: string[], title?: string) {
  async function searchTitleGenre() {
    const genreFormat = genre.reduce((acc, v) => acc + `+${v}`)
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${genreFormat}&maxResults=40&filter=paid-ebooks&orderBy=relevance&key=${apiKey}`
    )
    const data: Books = await response.json()

    const booksList: BOOK_API[] = data?.items?.map(item => {
      const book = {
        title: item.volumeInfo.title,
        id: item.id,
        price: item.saleInfo.listPrice?.amount,
        authors: item.volumeInfo.authors,
        language: item.volumeInfo.language,
        publisher: item.volumeInfo.publisher,
        publisherDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount
      }
      return book
    })
    const booksApi: BOOKS_API = {
      totalItems: data.totalItems,
      books: booksList
    }
    return booksApi
  }

  async function init() {
    let books: BOOKS_API | undefined = await searchTitleGenre()

    if (books.totalItems === 0 && title) {
      books = await GET_VOLUME_TITLE_BOOKS(title.replace(/\s\w+/g, ''))
    }
    return books
  }
  const getData = init()
  return {
    getData
  }
}

export async function NEW_BOOKS() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=orderBy:newest&key=${apiKey}`
    )
    const data = response.json()
    return data
  } catch (err) {
    return null
  }
}

export async function GET_VOLUME_TITLE_BOOKS(title: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=40&filter=paid-ebooks`
    )
    const data: Books = await response.json()

    const books: BOOK_API[] = data.items.map(item => {
      const book = {
        title: item.volumeInfo.title,
        id: item.id,
        price: item.saleInfo.listPrice?.amount,
        authors: item.volumeInfo.authors,
        language: item.volumeInfo.language,
        publisher: item.volumeInfo.publisher,
        publisherDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount
      }
      return book
    })

    const booksApi: BOOKS_API = {
      totalItems: data.totalItems,
      books
    }
    return booksApi
  } catch (err) {
    console.log(err)
  }
}

export async function GET_BOOKS_PARAMS(
  params: string,
  index: number = 0,
  maxResults: number = 40
) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${params}&startIndex=${index}&filter=paid-ebooks&maxResults=${maxResults}&key=${apiKey}`
  )
  const data: Books = await response.json()
  const booksList: BOOK_API[] = data.items.map(item => {
    const book = {
      title: item.volumeInfo.title,
      id: item.id,
      price: item.saleInfo.listPrice?.amount,
      authors: item.volumeInfo.authors,
      language: item.volumeInfo.language,
      publisher: item.volumeInfo.publisher,
      publisherDate: item.volumeInfo.publishedDate,
      pageCount: item.volumeInfo.pageCount
    }
    return book
  })
  const booksApi: BOOKS_API = {
    totalItems: data.totalItems,
    books: booksList
  }
  return booksApi
}
