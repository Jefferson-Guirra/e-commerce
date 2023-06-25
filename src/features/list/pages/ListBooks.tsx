import { useState } from 'react'
import { IListProps } from '../@types/IListProps'
import styles from './styles.module.css'
import { BiSearch } from 'react-icons/bi'
import { ContainerBooks } from '../components/ContainerBooks'
import { AddBookModel } from '../../../server/domain/usecases/book-list/add-book-list'
import { Api } from '../../../utils/api'

const apiUserBooks = new Api()
export const ListBooks = ({ books, accessToken }: IListProps) => {
  const [bookList, setBookList] = useState(books)
  const [input, setInput] = useState('')
  let filteredBooks = []
  filteredBooks = bookList.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  ) as AddBookModel[]

  const handleSubmit = () => {
    return null
  }

  const handleExcludeBookDatabase = async (idBook: string) => {
    await apiUserBooks.delete(
      {
        accessToken,
        idBook,
      },
      'booklist/remove'
    )
    const newBooks = bookList.filter((item) => item.bookId !== idBook)
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
              handleExcludeBookDatabase={handleExcludeBookDatabase}
            />
          ) : (
            <ContainerBooks
              books={bookList}
              handleExcludeBookDatabase={handleExcludeBookDatabase}
            />
          )}
        </article>
      ) : (
        <p style={{ color: '#f31', fontSize: '1.3rem' }}>Lista vazia</p>
      )}
    </section>
  )
}
