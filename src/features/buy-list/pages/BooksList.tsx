import styles from './styles.module.css'
import { useState } from 'react'
import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import {
  HeaderComponent,
  LoadingComponent,
  CardBook,
  BuyComponent,
  ResetComponent,
  PurchaseComponent,
} from '../components'
import { useBuyContext } from '../../../context/books-buy-list/BuyBookContext'
import { Search } from '../../../components'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

const validate = (input: string, title: string) => {
  if (input === '') {
    return false
  }
  return title.toLowerCase().includes(input.toLowerCase())
}

export const BooksList = ({ books, accessToken }: IBuyBooksProps) => {
  const {
    dispatch,
    books: booksState,
    collectionLoading,
    price,
  } = useBuyContext()
  const [input, setInput] = useState('')
  const [purchase, setPurchase] = useState(false)
  const [reset, setReset] = useState(false)
  const filteredBooks = booksState.filter((book) => validate(input, book.title))

  const handleReset = (state: boolean) => {
    setReset(state)
  }
  useEffect(() => {
    dispatch({ type: 'INIT_STATE', payload: { books } })
  }, [])

  return (
    <>
      <section className={styles.content}>
        <HeaderComponent handleReset={handleReset} />
        {!booksState.length && <p style={{ color: '#f31' }}>Carrinho vazio</p>}
        {!!booksState.length && (
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
        )}
        {!!filteredBooks.length
          ? filteredBooks.map((book) => <CardBook {...book} key={book.id} />)
          : booksState.map((book) => <CardBook {...book} key={book.id} />)}
      </section>
      {!!booksState.length && (
        <article className={styles.price}>
          <p>
            Total do carrinho: R${price.toFixed(2).toString().replace('.', ',')}
          </p>
        </article>
      )}
      <PurchaseComponent setState={setPurchase} listSize={booksState.length} />

      {reset && <ResetComponent handleReset={handleReset} />}
      <BuyComponent
        purchase={purchase}
        setValue={setPurchase}
        price={price.toFixed(2)}
        accessToken={accessToken}
      />
      <LoadingComponent loading={collectionLoading} />
    </>
  )
}
