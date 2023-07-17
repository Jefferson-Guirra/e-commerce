import styles from './styles.module.css'
interface Props {
  title: string
  price: number
  page: number
  language: string
}
const formatPrice = (number: number) => {
  return number.toLocaleString('pt-BR')
}
export const ListDataBook = ({ title, price, page, language }: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <span>Título:</span> {title}
      </p>
      <p>
        <span>Preço:</span> {formatPrice(price)}
      </p>
      <p>
        <span>Páginas:</span> {page}
      </p>
      <p>
        <span>Idioma:</span> {language}
      </p>
    </div>
  )
}
