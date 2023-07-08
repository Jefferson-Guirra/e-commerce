import styles from './styles.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import {
  HeaderComponent,
  ListCard,
  LoadingComponent,
  ResetComponent,
} from '../components'
import { useBuyContext } from '../../../context/books-buy-list/BuyBookContext'
import { Search } from '../../../components'
import { useListContext } from '../../../context/books-list/BookList'
import { AddBookModel } from '../../../server/domain/usecases/book-list/add-book-list'

interface Props {
  books: AddBookModel[]
}

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

const validate = (input: string, title: string) => {
  if (input === '') {
    return false
  }
  return title.toLowerCase().includes(input.toLowerCase())
}

export const Books = ({ books }: Props) => {
  const { dispatch, booksList } = useListContext()
  const [input, setInput] = useState('')
  const [reset, setReset] = useState(false)
  const filteredBooks = booksList.filter((book) => validate(input, book.title))

  const handleReset = (state: boolean) => {
    setReset(state)
  }
  useEffect(() => {
    dispatch({ type: 'INIT', payload: { books } })
  }, [])

  return (
    <>
      <section className={styles.content}>
        <HeaderComponent handleReset={handleReset} />
        <Search.Root>
          <Search.Input
            value={input}
            onChange={({ target }) => setInput(target.value)}
            placeholder="...buscar"
          />
          <Search.Button>
            <Search.Icon icon={BiSearch} size={30} color="#001f3f" />
          </Search.Button>
        </Search.Root>
        {filteredBooks.length > 0
          ? filteredBooks.map((book) => <ListCard {...book} key={book.id} />)
          : booksList.map((book) => <ListCard {...book} key={book.id} />)}
      </section>
      <ResetComponent reset={reset} handleReset={handleReset} />
      <LoadingComponent />
    </>
  )
}
