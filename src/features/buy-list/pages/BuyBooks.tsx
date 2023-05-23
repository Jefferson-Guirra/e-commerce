import styles from './styles.module.css'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { REMOVE_BOOK_DATABASE } from '../../../services/helper/FirebaseFunctions'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../services/firebaseConnection'
import PaypalAction from '../../../components/PaypalAction'
import { MdAdd, MdRemove } from 'react-icons/md'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useUserContext } from '../../../UserContext'
import { IBuyBooksProps } from '../@types/IBuyBooksProps'

//Sandbox-id:AbJhKpgKw6gr0oH9PRqCr35jMcfKfaKYtRF_LGoDeOeiQhrsBsEsL_N_fXggNgGFnCFtyS55WsZJB4tI

export const BuyBooks = ({ books }: IBuyBooksProps) => {
  const [bookList, setBookList] = useState(books)
  const [purchase, setPurchase] = useState(false)
  const router = useRouter()
  const { updatedBuyList, clearPurchaseList } = useUserContext()
  const price = bookList.reduce((acc, v) => acc + v.price * v.qtd, 0)
  const handleExclude = (id: string) => {
    updatedBuyList('remove')
    REMOVE_BOOK_DATABASE({ id, idCollection: 'buyBooks' })
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
      REMOVE_BOOK_DATABASE({ id: item.idDoc, idCollection: 'buyBooks' })
    })
    setBookList([])
    clearPurchaseList()
  }

  return (
    <>
      <section className={styles.content}>
        <h1>Meu Carrinho</h1>
        {bookList.map((item) => (
          <article className={styles.cardContent} key={item.idDoc}>
            <h2>{item.publisher}</h2>
            <article className={styles.infoBook}>
              <Link href={`/Book/${item.id}`} className={styles.img}>
                <img
                  src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w340-h600&source=gbs_api`}
                  height="150px"
                  alt={`Imagem do livro ${item.title}`}
                />
              </Link>
              <div className={styles.dataBook}>
                <div className={styles.header}>
                  <div className={styles.bookTitle}>
                    <p>{item.title}</p>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.qtd}>
                      <MdRemove
                        onClick={() => handlePrev(item.idDoc)}
                        size={20}
                        color="#363636"
                      />
                      <p>{item.qtd}</p>
                      <MdAdd
                        onClick={() => handleNext(item.idDoc)}
                        size={20}
                        color="#363636"
                      />
                    </button>
                    <p>
                      R$:{' '}
                      {(item.price * item.qtd)
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')}
                    </p>
                    <button
                      className={styles.btnExclude}
                      onClick={() => handleExclude(item.idDoc)}
                    >
                      <IoClose size={20} color="#363636" />
                    </button>
                  </div>
                </div>
                <div className={styles.textInfo}>
                  <p>Ano: </p>
                  <span>{item.publisherDate.replace(/\-\d+/g, '')}</span>
                </div>
                <div className={styles.textInfo}>
                  <p className={styles.textInfo}>Páginas: </p>
                  <span>{item.pageCount}</span>
                </div>
                <div className={styles.textInfo}>
                  <p>Idioma: </p>
                  <span>{item.language}</span>
                </div>
              </div>
            </article>

            <article className={styles.buyInfoCard}>
              <h2>Entrega Básica</h2>
              <div className={styles.infoBuy}>
                <span id="free">Frete grátis </span>
                <p>neste vendedor nas compras a partir de</p>
                <span>
                  {' '}
                  R$ {item.shipping.toFixed(2).toString().replace('.', ',')}
                </span>
              </div>
            </article>
          </article>
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
