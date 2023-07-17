import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { BiUser, BiBookAlt, BiSearch } from 'react-icons/bi'
import styles from './styles.module.css'

export const Search = () => {
  const [filter, setFilter] = useState('')
  const router = useRouter()
  const [input, setInput] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (filter !== '') {
      filter === 'Autor'
        ? router.push(`/Search/inauthor:${input}`)
        : router.push(`/Search/intitle:${input}`)
      setInput('')
    } else {
      alert('Informe um filtro')
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.container} id="navbar-form">
      <ul>
        <li className={styles.content}>
          <span className={styles.filter}>
            <p>{filter === '' ? 'Filtrar' : filter}</p>
            <MdOutlineNavigateNext size={25} />
          </span>
          <div className={styles.options}>
            <div onClick={() => setFilter('Autor')} className={styles.option}>
              <BiUser size={18} color="#ffa500" />
              <p>Autor</p>
            </div>
            <div onClick={() => setFilter('Livro')} className={styles.option}>
              <BiBookAlt size={18} color="#ffa500" />
              <p>Livro</p>
            </div>
          </div>
        </li>
      </ul>

      <input
        type="text"
        id="input-home"
        value={input}
        onChange={({ target }) => setInput(target.value)}
        placeholder="buscar..."
      />
      <button type="submit" className={styles.icon}>
        <BiSearch size={30} color="#001f3f" />
      </button>
    </form>
  )
}
