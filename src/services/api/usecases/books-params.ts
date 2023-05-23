import { Books } from '../../../Types/Books'
import { apiKey } from '../helpers/api-key'
import { IBookApi, IBooksApi } from '../@types'

export async function GET_BOOKS_PARAMS(
  params: string,
  index = 0,
  maxResults = 40
) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${params}&startIndex=${index}&filter=paid-ebooks&maxResults=${maxResults}&key=${apiKey}`
  )
  const data: Books = await response.json()
  const booksList: IBookApi[] = data.items?.map((item) => {
    const book = {
      title: item.volumeInfo.title,
      id: item.id,
      price: item.saleInfo.listPrice?.amount,
      authors: item.volumeInfo.authors,
      language: item.volumeInfo.language,
      publisher: item.volumeInfo.publisher,
      publisherDate: item.volumeInfo.publishedDate,
      pageCount: item.volumeInfo.pageCount,
    }
    return book
  })
  const booksApi: IBooksApi = {
    totalItems: data.totalItems,
    books: booksList,
  }
  return booksApi
}
