import styles from './styles.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import { useEffect } from 'react'
import {
  HeaderComponent,
  LoadingComponent,
  BuyBookCard,
  BuyComponent,
  ResetComponent,
  PurchaseComponent,
} from '../components'
import { useBuyContext } from '../../../context/books-buy-list/BuyBookContext'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

export const BuyBooks = ({ books, accessToken }: IBuyBooksProps) => {
  const {
    dispatch,
    books: booksState,
    collectionLoading,
    price,
  } = useBuyContext()
  const [purchase, setPurchase] = useState(false)
  const [reset, setReset] = useState(false)
  const router = useRouter()

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
        {booksState.map((book) => (
          <BuyBookCard key={book.id} {...book} />
        ))}
      </section>
      <article className={styles.price}>
        <p>
          Total do carrinho: R${price.toFixed(2).toString().replace('.', ',')}
        </p>
      </article>
      <PurchaseComponent setState={setPurchase} listSize={booksState.length} />

      <ResetComponent
        accessToken={accessToken}
        reset={reset}
        handleReset={handleReset}
      />
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
