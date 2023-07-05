import { useState } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import { IBuyProps } from './@types/IBuyProps'
import { useRouter } from 'next/router'
import { HandleBuyBookDatabase } from '../../../../utils/handle-buy-book-database'
import { useHeaderContext } from '../../../../context/header/HeaderContext'
import { parseCookies } from 'nookies'
import { ButtonComposite } from '../../../../components'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
  return (
    <ButtonComposite.Icon
      icon={AiOutlineLoading3Quarters}
      size={21}
      color="#fafafa"
    />
  )
}

const handleBuyBookDatabase = new HandleBuyBookDatabase()
export const Buy = ({ book }: IBuyProps) => {
  const { dispatch } = useHeaderContext()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleAddBuyBook = async () => {
    const { literando_accessToken: accessToken } = parseCookies()
    if (accessToken) {
      try {
        setLoading(true)
        await handleBuyBookDatabase.validateAdd(
          JSON.parse(accessToken),
          book.id,
          dispatch,
          1
        )
        const response = await handleBuyBookDatabase.addBook(
          JSON.parse(accessToken),
          book
        )
        if (response.statusCode === 401) {
          console.error(response)
        }
      } finally {
        setLoading(false)
      }
    } else {
      router.push('/Login')
    }
  }

  const handleAddBuyBookList = async () => {
    const { literando_accessToken: accessToken } = parseCookies()
    if (accessToken) {
      try {
        setLoading(true)
        await handleBuyBookDatabase.validateAdd(
          JSON.parse(accessToken),
          book.id,
          dispatch,
          1
        )
        const response = await handleBuyBookDatabase.addBook(
          JSON.parse(accessToken),
          book
        )
        if (response.statusCode === 401) {
          alert('É necessário efetuar login.')
          return
        }
        router.push('/Buy')
      } finally {
        setLoading(false)
      }
    } else {
      router.push('/Login')
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
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTXfDgACogFakP/skwAAAABJRU5ErkJggg=="
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
          <ButtonComposite.Action
            text="Adicionar ao carrinho"
            onClick={handleAddBuyBook}
            disabled={loading}
            className={styles.btn}
            style={{ backgroundColor: '#ffd814' }}
          >
            <Loading />
          </ButtonComposite.Action>

          <ButtonComposite.Action
            text="Comprar"
            onClick={handleAddBuyBookList}
            disabled={loading}
            className={styles.btn}
            style={{ backgroundColor: '#ffa500' }}
          >
            <Loading />
          </ButtonComposite.Action>
        </article>
      ) : (
        <p style={{ color: '#f31', textAlign: 'center' }}>Indisponível</p>
      )}
    </div>
  )
}
