import {
  useContext,
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
} from 'react'
import { Actions } from './@types/IActions'
import { BuyBooksState } from './@types/IInitial-state'
import { initialState } from './@types/IInitial-state'

interface IContext extends BuyBooksState {
  dispatch: Dispatch<Actions>
}
interface IProps {
  children: ReactNode
}
const createBuyBooksContext = createContext<IContext>(null!)
export const BuyStorage = ({ children }: IProps) => {
  const reducer = (state: BuyBooksState, action: Actions): BuyBooksState => {
    switch (action.type) {
      case 'INIT_STATE':
        return {
          ...state,
          books: action.payload.books,
          price: state.books.reduce((acc, v) => acc + v.amount * v.price, 0),
        }

      case 'ADD_SELECT_BOOK':
        const { accessToken, bookId, amount, price } = action.payload
        const newPriceStorage = [
          ...state.priceStorage,
          { id: bookId, amount, price },
        ]
        return {
          ...state,
          deleteBooksStorage: [
            ...state.deleteBooksStorage,
            { accessToken, bookId },
          ],
          priceStorage: newPriceStorage,
          price: newPriceStorage.reduce(
            (acc, vl) => acc + vl.amount * vl.price,
            0
          ),
        }
      case 'REMOVE_SELECT_BOOK':
        const { bookId: id } = action.payload
        const deleteBooksStorage = state.deleteBooksStorage.filter(
          (book) => book.bookId !== id
        )
        if (deleteBooksStorage.length > 0) {
          const removePriceStorage = state.priceStorage.filter(
            (props) => props.id !== id
          )
          return {
            ...state,
            deleteBooksStorage,
            priceStorage: removePriceStorage,
            price: removePriceStorage.reduce(
              (acc, vl) => acc + vl.amount * vl.price,
              0
            ),
          }
        }
        return {
          ...state,
          deleteBooksStorage,
          priceStorage: [],
          price: state.books.reduce((acc, vl) => acc + vl.amount * vl.price, 0),
        }
      case 'RESET_BOOKS':
        const booksPrice = state.books.reduce(
          (acc, vl) => acc + vl.amount * vl.price,
          0
        )
        const resetPrice = state.resetBooksStorage.reduce(
          (acc, vl) => acc + vl.amount * vl.price,
          0
        )
        if (state.priceStorage.length > 0) {
          return {
            ...state,
            books: [...state.books, ...state.resetBooksStorage],
            price: state.priceStorage.reduce(
              (acc, vl) => acc + vl.price * vl.amount,
              0
            ),
            resetBooksStorage: [],
          }
        }
        return {
          ...state,
          books: [...state.books, ...state.resetBooksStorage],
          price: booksPrice + resetPrice,
          resetBooksStorage: [],
        }
      case 'FETCH_START':
        return {
          ...state,
          loading: true,
        }

      case 'FETCH_SUCCESS':
        return {
          ...state,
          loading: false,
        }

      case 'FETCH_ERROR':
        return {
          ...state,
          loading: false,
        }

      case 'FETCH_REMOVE_SUCCESS':
        const { deleteBook } = action.payload
        const newBooks = state.books.filter(
          ({ bookId }) => bookId !== deleteBook.bookId
        )
        const newDeleteBooksStorage = state.deleteBooksStorage.filter(
          (props) => props.bookId !== deleteBook.bookId
        )
        const newTotPrice = state.priceStorage.filter(
          (props) => props.id !== deleteBook.bookId
        )
        if (newTotPrice.length > 0) {
          return {
            ...state,
            loading: false,
            books: newBooks,
            priceStorage: newTotPrice,
            deleteBooksStorage: newDeleteBooksStorage,
            resetBooksStorage: [...state.resetBooksStorage, deleteBook],
            price: newTotPrice.reduce(
              (acc, vl) => acc + vl.amount * vl.price,
              0
            ),
          }
        }
        return {
          ...state,
          loading: false,
          books: newBooks,
          priceStorage: newTotPrice,
          deleteBooksStorage: newDeleteBooksStorage,
          resetBooksStorage: [...state.resetBooksStorage, deleteBook],
          price: newBooks.reduce((acc, vl) => acc + vl.amount * vl.price, 0),
        }

      case 'FETCH_UPDATE_SUCCESS':
        const { updateBook } = action.payload
        const booksUpdate = [...state.books]
        const index = booksUpdate.findIndex(
          ({ bookId }) => bookId === updateBook.bookId
        )
        booksUpdate[index].amount = updateBook.amount

        if (state.priceStorage.length > 0) {
          const updatePriceStorage = [...state.priceStorage]
          const findPrice = updatePriceStorage.findIndex(
            (props) => props.id === updateBook.bookId
          )
          updatePriceStorage[findPrice].amount = updateBook.amount
          return {
            ...state,
            loading: false,
            books: booksUpdate,
            priceStorage: updatePriceStorage,
            price: updatePriceStorage.reduce(
              (acc, vl) => acc + vl.amount * vl.price,
              0
            ),
          }
        } else {
          return {
            ...state,
            loading: false,
            books: booksUpdate,
            price: booksUpdate.reduce(
              (acc, vl) => acc + vl.amount * vl.price,
              0
            ),
          }
        }

      case 'FETCH_DELETED_BOOKS_SUCCESS':
        const { deletedBooks } = action.payload
        const removedBooks = state.books.filter(
          ({ bookId }) => !deletedBooks.find((book) => book.bookId === bookId)
        )
        const removedPrice = state.priceStorage.filter(
          ({ id }) => !deletedBooks.find((book) => book.bookId === id)
        )
        if (removedPrice.length > 0) {
          return {
            ...state,
            loading: false,
            resetBooksStorage: [...state.resetBooksStorage, ...deletedBooks],
            books: removedBooks,
            priceStorage: removedPrice,
            price: removedPrice.reduce(
              (acc, vl) => acc + vl.amount * vl.price,
              0
            ),
            deleteBooksStorage: [],
          }
        }
        return {
          ...state,
          loading: false,
          resetBooksStorage: [...state.resetBooksStorage, ...deletedBooks],
          books: removedBooks,
          price: removedBooks.reduce(
            (acc, vl) => acc + vl.amount * vl.price,
            0
          ),
          deleteBooksStorage: [],
        }

      case 'FETCH_CLEAR_STATE':
        return {
          ...state,
          loading: false,
          books: [],
          price: 0.0,
          deleteBooksStorage: [],
          resetBooksStorage: [],
        }

      default:
        return state
    }
  }

  const [stateBooks, dispatch] = useReducer(reducer, initialState)
  return (
    <createBuyBooksContext.Provider value={{ dispatch, ...stateBooks }}>
      {children}
    </createBuyBooksContext.Provider>
  )
}

export const useBuyContext = () => useContext(createBuyBooksContext)
