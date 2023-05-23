import { Books } from '../../../Types/Books'
import { IBooksApi, IBookApi } from '../@types'
import { apiKey } from '../helpers/api-key'
import { GET_VOLUME_TITLE_BOOKS } from './volume-title-books'

export function SEARCH_BOOKS_GENRES(genre: string[], title?: string) {
  async function searchTitleGenre() {
    const genreFormat = genre.reduce((acc, v) => acc + `+${v}`)
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${genreFormat}&maxResults=40&filter=paid-ebooks&orderBy=relevance&key=${apiKey}`
    )
    const data: Books = await response.json()

    const booksList: IBookApi[] = data?.items?.map((item) => {
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

  async function init() {
    let books: IBooksApi | undefined = await searchTitleGenre()

    if (books.totalItems === 0 && title) {
      books = await GET_VOLUME_TITLE_BOOKS(title.replace(/\s\w+/g, ''))
    }
    return books
  }
  const getData = init()
  return {
    getData,
  }
}
