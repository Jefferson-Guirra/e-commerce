import { Book } from '../../../Types/Books'
import { IBookIdApi } from '../@types'

export async function SEARCH_BOOKS_ID(id: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    )
    const data: Book = await response.json()

    const booksList: IBookIdApi = {
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
    console.log(err)
  }
}
