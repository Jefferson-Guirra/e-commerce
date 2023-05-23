import { Books } from '../../../Types/Books'
import { IBookApi, IBooksApi } from '../@types'

export const GET_VOLUME_TITLE_BOOKS = async (title: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=40&filter=paid-ebooks`
    )
    const data: Books = await response.json()

    const books: IBookApi[] = data.items.map((item) => {
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
      books,
    }
    return booksApi
  } catch (err) {
    console.log(err)
  }
}
