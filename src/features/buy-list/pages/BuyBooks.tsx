import styles from './styles.module.css'
import { useState } from 'react'
import { RemoveBook } from '../../../services/db/usecases/remove-book'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../services/db/helpers/firebaseConnection'
import PaypalAction from '../../../components/PaypalAction'
import { useRouter } from 'next/router'
import { useUserContext } from '../../../context/user/UserContext'
import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import { BuyBookCard } from '../components'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

export const BuyBooks = ({ books }: IBuyBooksProps) => {
  const [bookList, setBookList] = useState(books)
  const [purchase, setPurchase] = useState(false)
  const router = useRouter()
  const { updatedBuyList, clearPurchaseList } = useUserContext()
  const price = bookList.reduce((acc, v) => acc + v.price * v.qtd, 0)

  const handleExclude = (id: string) => {
    updatedBuyList('remove')
    RemoveBook({ id, idCollection: 'buyBooks' })
    const newBooks = bookList.filter((item) => item.idDoc !== id)
    setBookList(newBooks)
  }

  const handleNext = async (idDoc: string) => {
    const updatedBooks = [...bookList]
    const index = updatedBooks.findIndex((item) => item.idDoc === idDoc)
    const docRef = doc(db, 'buyBooks', idDoc)

    await updateDoc(docRef, {
      qtd: updatedBooks[index].qtd + 1,
    })
    updatedBooks[index].qtd = updatedBooks[index].qtd + 1
    setBookList(updatedBooks)
  }

  const handlePrev = async (idDoc: string) => {
    const updatedBooks = [...bookList]
    const index = updatedBooks.findIndex((item) => item.idDoc === idDoc)
    const docRef = doc(db, 'buyBooks', idDoc)

    if (updatedBooks[index].qtd > 1) {
      await updateDoc(docRef, {
        qtd: updatedBooks[index].qtd - 1,
      })
      updatedBooks[index].qtd = updatedBooks[index].qtd - 1
      setBookList(updatedBooks)
    }
  }

  const clearBuyList = async () => {
    bookList.forEach((item) => {
      RemoveBook({ id: item.idDoc, idCollection: 'buyBooks' })
    })
    setBookList([])
    clearPurchaseList()
  }

  return (
    <>
      <section className={styles.content}>
        <h1>Meu Carrinho</h1>
        {bookList.map((item) => (
          <BuyBookCard
            handleExclude={handleExclude}
            handleNext={handleNext}
            handlePrev={handlePrev}
            id={item.id}
            idDoc={item.idDoc}
            language={item.language}
            pageCount={item.pageCount}
            price={item.price}
            publisher={item.publisher}
            publisherDate={item.publisherDate}
            qtd={item.qtd}
            shipping={item.shipping}
            title={item.title}
            key={item.idDoc}
          />
        ))}
      </section>
      <article className={styles.price}>
        <p>
          Total do carrinho: R${price.toFixed(2).toString().replace('.', ',')}
        </p>
      </article>
      {bookList.length > 0 && (
        <article className={styles.checkout}>
          <button className={styles.addButton} onClick={() => router.push('/')}>
            ESCOLHER MAIS LIVROS
          </button>
          <button
            className={styles.buyButton}
            onClick={() => setPurchase(true)}
          >
            FINALIZAR PEDIDO
          </button>
        </article>
      )}
      {purchase && (
        <PaypalAction
          setValue={setPurchase}
          price={price.toFixed(2)}
          clearBuyList={clearBuyList}
        />
      )}
    </>
  )
}
