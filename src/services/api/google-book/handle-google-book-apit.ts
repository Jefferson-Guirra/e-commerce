import { GoogleBook } from './@types/google-book'
import { GoogleBooks } from './@types/google-books'
import { GoogleBookFormat } from './@types/google-book-format'
import { SearchBooksByGenres } from './protocols/search-by-genres'
import { SearchBookById } from './protocols/serarch-by-id'
import { GoogleBooksFormat } from './@types/google-books-format'
import { googleBookApiKey } from './helpers/google-book-api-key'
import { SearchNewBooks } from './protocols/search-new-books'
import { SearchRelevanceBooks } from './protocols/search-relevance-books'
import { SearchBooksByTitle } from './protocols/search-book-by-ttle'
import { SearchPaginationBooks } from './protocols/search-pagination-books'

export class GoogleBookApi
  implements
    SearchBookById,
    SearchBooksByGenres,
    SearchNewBooks,
    SearchRelevanceBooks,
    SearchBooksByTitle,
    SearchPaginationBooks
{
  async searchById(bookId: string): Promise<GoogleBookFormat | undefined> {
    try {
      const promise = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      )
      const data: GoogleBook = await promise.json()

      const booksList: GoogleBookFormat = {
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
        description: data.volumeInfo.description,
      }
      return booksList
    } catch (err) {
      console.error(err)
      throw new Error('Error: searchBokById method')
    }
  }
  async searchByGenres(
    genres: string[]
  ): Promise<GoogleBooksFormat | undefined> {
    if (!!genres?.length) {
      try {
        const genreFormat = genres.reduce((acc, v) => acc + `+${v}`)
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${genreFormat}&maxResults=40&filter=paid-ebooks&orderBy=relevance&key=${googleBookApiKey}`
        )
        const data: GoogleBooks = await response.json()

        const booksList: GoogleBookFormat[] = data?.items?.map((item) => {
          const book = {
            avarege: item.volumeInfo.averageRating,
            categories: item.volumeInfo.categories,
            subtitle: item.volumeInfo.subtitle,
            description: item.volumeInfo.description,
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
        const books: GoogleBooksFormat = {
          totalItems: data.totalItems,
          items: booksList,
        }
        return books
      } catch (err) {
        console.error(err)
        throw new Error('Error: searchBooksByGenres')
      }
    }
  }
  async searchNewBooks(): Promise<GoogleBooksFormat | undefined> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=orderBy:newest&key=${googleBookApiKey}`
      )
      const data: GoogleBooksFormat = await response.json()
      if (!!data.totalItems) {
        return data
      }
    } catch (err) {
      throw new Error('Error: Search New books method')
    }
  }
  async searchByRelevance(): Promise<GoogleBooksFormat | undefined> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=orderBy:relevance&key=${googleBookApiKey}`
      )
      const data: GoogleBooksFormat = await response.json()

      if (!!data.totalItems) {
        return data
      }
    } catch (err) {
      console.error(err)
      throw new Error('Error: searchBooksByRelevance method')
    }
  }
  async searchByTitle(title: string): Promise<GoogleBooksFormat | undefined> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=40&filter=paid-ebooks`
      )
      const data: GoogleBooks = await response.json()

      const books: GoogleBookFormat[] = data.items.map((item) => {
        const book = {
          title: item.volumeInfo.title,
          id: item.id,
          price: item.saleInfo.listPrice?.amount,
          authors: item.volumeInfo.authors,
          language: item.volumeInfo.language,
          publisher: item.volumeInfo.publisher,
          publisherDate: item.volumeInfo.publishedDate,
          pageCount: item.volumeInfo.pageCount,
          categories: item.volumeInfo.categories,
          subtitle: item.volumeInfo.subtitle,
          description: item.volumeInfo.description,
          avarege: item.volumeInfo.averageRating,
        }
        return book
      })

      const booksApi: GoogleBooksFormat = {
        totalItems: data.totalItems,
        items: books,
      }
      return booksApi
    } catch (err) {
      console.log(err)
      throw new Error('Error: searchBooksByTitle')
    }
  }
  async searchPage(
    params: string,
    index = 0,
    maxResults = 40
  ): Promise<undefined | GoogleBooksFormat> {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${params}&startIndex=${index}&filter=paid-ebooks&maxResults=${maxResults}&key=${googleBookApiKey}`
    )
    const data: GoogleBooks = await response.json()
    const booksList: GoogleBookFormat[] = data.items?.map((item) => ({
      title: item.volumeInfo.title,
      id: item.id,
      price: item.saleInfo.listPrice?.amount,
      authors: item.volumeInfo.authors,
      language: item.volumeInfo.language,
      publisher: item.volumeInfo.publisher,
      publisherDate: item.volumeInfo.publishedDate,
      pageCount: item.volumeInfo.pageCount,
      categories: item.volumeInfo.categories,
      subtitle: item.volumeInfo.subtitle,
      description: item.volumeInfo.description,
      avarege: item.volumeInfo.averageRating,
    }))

    const booksApi: GoogleBooksFormat = {
      totalItems: data.totalItems,
      items: booksList,
    }
    return booksApi
  }
}
