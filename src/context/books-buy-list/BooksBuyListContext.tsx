import { ReactNode, createContext, useContext, useState } from 'react'
import { ApiBook } from '../../utils/book-api'
import { AddBuyBookModel } from '../../server/domain/usecases/book-buy-list/add-book-buy-list'

interface IBuyBooksContext {
  loading: boolean
  handleLoading: (state: boolean) => void
  handleUpdateAmountBookBuyListDatabase: (
    bookId: string,
    value: number,
    accessToken: string
  ) => Promise<void>
  handleBookList: (books: AddBuyBookModel[]) => void
}

interface IProps {
  children: ReactNode
}
const apiBook = new ApiBook()
export const BuyBooksContext = createContext<IBuyBooksContext>(null!)
export const BooksBuyListContext = ({ children }: IProps) => {
  const [bookList, setBookList] = useState<AddBuyBookModel[]>([])
  const [loading, setLoading] = useState(false)

  const handleBookList = (books: AddBuyBookModel[]) => {
    setBookList(books)
  }

  const handleLoading = (state: boolean) => {
    setLoading(state)
  }

  const handleUpdateAmountBookBuyListDatabase = async (
    bookId: string,
    value: number,
    accessToken: string
  ) => {
    try {
      setLoading(true)
      await apiBook.put(
        { accessToken, bookId, amount: value },
        'buybooklist/update-amount'
      )
      const updatedBooks = [...bookList]
      const index = updatedBooks.findIndex((book) => book.bookId === bookId)
      updatedBooks[index].amount = value
      setBookList(updatedBooks)
    } finally {
      setLoading(false)
    }
  }
  return (
    <BuyBooksContext.Provider
      value={{
        handleLoading,
        loading,
        handleUpdateAmountBookBuyListDatabase,
        handleBookList,
      }}
    >
      {children}
    </BuyBooksContext.Provider>
  )
}

export const useBuyBooksContext = () => useContext(BuyBooksContext)
