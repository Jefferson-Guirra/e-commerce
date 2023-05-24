import { useState } from 'react'
import styles from './styles.module.css'
import { doc, getDoc } from 'firebase/firestore'
import { IDataBook } from '../../../../services/db/@types'
import { UpdateBook } from '../../../../services/db/usecases'
import { AddBook } from '../../../../services/db/usecases/add-book'
import { db } from '../../../../services/db/helpers/firebaseConnection'
import Image from 'next/image'
import { useUserContext } from '../../../../context/user/UserContext'
import { IBuyProps } from './@types/IBuyProps'
import { useRouter } from 'next/router'

export const Buy = ({ token, query, book }: IBuyProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { updatedBuyList } = useUserContext()
  const router = useRouter()

  const handleBuy = async () => {
    await handleAddBuyListDatabase()
    if (token) {
      setTimeout(() => router.push('/Buy'), 150)
    }
  }
  const handleAddBuyListDatabase = async () => {
    setLoading(true)
    if (token) {
      const docRef = doc(db, 'buyBooks', query + token)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const book = docSnap.data() as IDataBook
        await UpdateBook({
          collection: 'buyBooks',
          idBook: query,
          tokenUser: token,
          value: book.qtd,
        })
      } else {
        updatedBuyList('add')
        const response = await AddBook({
          book: book,
          collection: 'buyBooks',
          idBook: query,
          tokenUser: token,
        })
        console.log(response)
      }
    } else {
      alert('É necessário efetuar o login.')
    }
    setLoading(false)
  }
  return (
    <div className={styles.buyContainer}>
      <span className={styles.alert}>Menor preço</span>
      <article className={styles.infoBuy}>
        <div className={styles.img}>
          <Image
            src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h200&source=gbs_api`}
            fill
            alt={`Imagem do livro ${book.title}`}
          />
        </div>
        <div className={styles.textBuy}>
          <div className={styles.resizeTitle}>
            <h2>{book.title}</h2>
          </div>
          <div className={styles.itemBuy}>
            <p>Editora: </p>
            <div className={styles.resizeTitle}>
              <span>{book.publisher}</span>
            </div>
          </div>
          <div className={styles.itemBuy}>
            <p>Ano: </p>
            <span>{book.publisherDate?.replace(/-\d{2}/g, '')}</span>
          </div>
          <div className={styles.itemBuy}>
            <p>Páginas: </p>
            <span>{book.pageCount}</span>
          </div>
        </div>
      </article>

      {book.price ? (
        <article className={styles.actionsBuy}>
          <p className={styles.price}>
            <span>R$</span>
            {book.price.toFixed(2).toString().replace('.', ',')}
          </p>
          {!loading ? (
            <button
              onClick={handleAddBuyListDatabase}
              style={{ backgroundColor: '#ffd814' }}
            >
              Adicionar ao carrinho
            </button>
          ) : (
            <button disabled style={{ backgroundColor: '#ffd814' }}>
              Adicionando...
            </button>
          )}
          <button onClick={handleBuy} style={{ backgroundColor: '#ffa500' }}>
            Comprar
          </button>
        </article>
      ) : (
        <p style={{ color: '#f31', textAlign: 'center' }}>Indisponível</p>
      )}
    </div>
  )
}
