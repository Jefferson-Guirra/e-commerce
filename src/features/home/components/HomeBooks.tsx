import SliderBooks from '../../../components/SliderBooks'
import { BiBookOpen } from 'react-icons/bi'
import styles from './styles.module.css'
import { BOOKS_API } from '../../../Api'
export interface IHomeBooksProps {
  title: string
  bookList: BOOKS_API
}
export const HomeBooks = ({ title, bookList }: IHomeBooksProps) => {
  return (
    <section className={styles['books-container']}>
      <div className="title">
        <BiBookOpen size={40} />
        <h1>{title}</h1>
      </div>
      <SliderBooks bookList={bookList} />
    </section>
  )
}
