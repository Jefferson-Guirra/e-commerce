import { useRouter } from 'next/router'
import styles from './styles..module.css'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
  listSize: number
  setState: Dispatch<SetStateAction<boolean>>
}

export const PurchaseComponent = ({ listSize, setState }: IProps) => {
  const router = useRouter()
  return (
    <>
      {listSize > 0 && (
        <article className={styles.container}>
          <button className={styles.addButton} onClick={() => router.push('/')}>
            ESCOLHER MAIS LIVROS
          </button>
          <button className={styles.buyButton} onClick={() => setState(true)}>
            FINALIZAR PEDIDO
          </button>
        </article>
      )}
    </>
  )
}
