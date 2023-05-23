import { IBuyBooksProps } from '../@types/IBuyBooksProps'
import styles from './styles.module.css'
import { BuyBooks } from '../pages/BuyBooks'

export const BuyListContainer = (props: IBuyBooksProps) => {
  return (
    <div className={styles.container}>
      <BuyBooks {...props} />
    </div>
  )
}
