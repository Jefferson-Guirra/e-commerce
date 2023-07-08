import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react'
import { initialState, ListState } from './@types/initial-state'
import { Actions } from './@types/actions'
import { AddBookModel } from '../../server/domain/usecases/book-list/add-book-list'

interface Context extends ListState {
  dispatch: Dispatch<Actions>
}
const ListContext = createContext<Context>(null!)

interface Props {
  children: ReactNode
}

export const BookListStorage = ({ children }: Props) => {
  const reducer = (state: ListState, action: Actions): ListState => {
    switch (action.type) {
      case 'INIT':
        return {
          ...state,
          booksList: action.payload.books,
        }
      case 'ADD_SELECTED_BOOK':
        return {
          ...state,
          deleteStorage: [...state.deleteStorage, action.payload],
        }
      case 'REMOVE_SELECTED_BOOK':
        return {
          ...state,
          deleteStorage: state.deleteStorage.filter(
            ({ bookId }) => bookId !== action.payload.bookId
          ),
        }
      case 'REMOVE_BOOK':
        const findBook = state.booksList.find(
          ({ bookId }) => bookId === action.payload.bookId
        ) as AddBookModel
        return {
          ...state,
          booksList: state.booksList.filter(
            ({ bookId }) => bookId !== action.payload.bookId
          ),
          resetStorage: [...state.resetStorage, findBook],
          deleteStorage: state.deleteStorage.filter(
            ({ bookId }) => bookId !== action.payload.bookId
          ),
        }
      case 'REMOVE_ALL_BOOKS':
        const removedBooks = state.booksList.filter(
          ({ bookId }) =>
            !!state.deleteStorage.find((props) => props.bookId === bookId)
        )
        return {
          ...state,
          booksList: state.booksList.filter(
            ({ bookId }) =>
              !state.deleteStorage.find((props) => props.bookId === bookId)
          ),
          deleteStorage: [],
          resetStorage: [...state.resetStorage, ...removedBooks],
        }
      case 'RESET_BOOKS':
        return {
          ...state,
          booksList: [...state.booksList, ...action.payload.books],
          resetStorage: state.resetStorage.filter(
            ({ bookId }) =>
              !action.payload.books.find((book) => book.bookId === bookId)
          ),
        }
      case 'RESET_ALL_BOOKS':
        return {
          ...state,
          booksList: [...state.booksList, ...state.resetStorage],
          resetStorage: [],
        }
      case 'FETCH_START':
        return {
          ...state,
          loading: true,
        }
      case 'FETCH_ERROR':
        return {
          ...state,
          loading: false,
        }
      case 'FETCH_SUCCESS':
        return {
          ...state,
          loading: false,
        }
      case 'FETCH_COLLECTION_START':
        return {
          ...state,
          loading: true,
          collectionLoading: true,
        }
      case 'FETCH_COLLECTION_ERROR':
        return {
          ...state,
          loading: false,
          collectionLoading: false,
        }
      case 'FETCH_COLLECTION_SUCCESS':
        return {
          ...state,
          loading: false,
          collectionLoading: false,
        }
      default:
        return {
          ...state,
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListContext.Provider>
  )
}

export const useListContext = () => useContext(ListContext)
