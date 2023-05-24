import { useState } from 'react'
import { IDataBook } from '../../../services/db/@types'
import { RemoveBook } from '../../../services/db/usecases/remove-book'
import { IListProps } from '../@types/IListProps'
import styles from './styles.module.css'
import { BiSearch } from 'react-icons/bi'
import { ContainerBooks } from '../components/ContainerBooks'

export const ListBooks = ({ books }: IListProps) => {
  const [bookList, setBookList] = useState(books)
  const [input, setInput] = useState('')
  let filteredBooks = []
  filteredBooks = bookList.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  ) as IDataBook[]

  const handleSubmit = () => {
    return null
  }

  const handleExclude = (id: string) => {
    RemoveBook({ id, idCollection: 'books' })
    const newBooks = bookList.filter((item) => item.idDoc !== id)
    setBookList(newBooks)
  }

  return (
    <section className={styles.content}>
      <h1 className={styles.title}>Minha Lista</h1>
      {bookList.length > 0 ? (
        <article className={styles.contentBooks}>
          <form onSubmit={handleSubmit} className={styles.search}>
            <input
              className={styles.input}
              type="text"
              placeholder="buscar..."
              value={input}
              onChange={({ target }) => setInput(target.value)}
            />
            <span>
              <BiSearch size={30} color="#001f3f" />
            </span>
          </form>

          {filteredBooks.length > 0 ? (
            <ContainerBooks
              books={filteredBooks}
              handleExclude={handleExclude}
            />
          ) : (
            <ContainerBooks books={bookList} handleExclude={handleExclude} />
          )}
        </article>
      ) : (
        <p style={{ color: '#f31', fontSize: '1.3rem' }}>Lista vazia</p>
      )}
    </section>
  )
}
