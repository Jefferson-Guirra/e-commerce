import { useState } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import { IBuyProps } from './@types/IBuyProps'
import { useRouter } from 'next/router'

export const Buy = ({ book, handleAddBuyBookDatabase }: IBuyProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleAddBuyBook = async () => {
    try {
      setLoading(true)
      const response = await handleAddBuyBookDatabase()
      if (response.statusCode === 401) {
        alert('É necessário efetuar login.')
        return
      }
      router.push('/Buy')
    } finally {
      setLoading(false)
    }
  }

  const handleAddBuyBookList = async () => {
    try {
      setLoading(true)
      const response = await handleAddBuyBookDatabase()
      if (response.statusCode === 401) {
        alert('É necessário efetuar login.')
        return
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.buyContainer}>
      <span className={styles.alert}>Menor preço</span>
      <article className={styles.infoBuy}>
        <div className={styles.img}>
          <Image
            src={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w340-h200&source=gbs_api`}
            width={400}
            quality={100}
            priority
            height={0}
            style={{ width: '100%', height: 'auto', maxHeight: '200px' }}
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
              onClick={handleAddBuyBookList}
              style={{ backgroundColor: '#ffd814' }}
            >
              Adicionar ao carrinho
            </button>
          ) : (
            <button disabled style={{ backgroundColor: '#ffd814' }}>
              Adicionando...
            </button>
          )}
          <button
            disabled={loading}
            onClick={handleAddBuyBook}
            style={{ backgroundColor: '#ffa500' }}
          >
            Comprar
          </button>
        </article>
      ) : (
        <p style={{ color: '#f31', textAlign: 'center' }}>Indisponível</p>
      )}
    </div>
  )
}
