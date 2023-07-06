import { useMemo } from 'react'
import styles from './styles.module.css'

const generateRandomNumberInterval = (min: number, max: number) => {
  return (Math.random() * (max - min + 1) + min).toLocaleString('pt-BR', {
    style: 'currency',
    maximumFractionDigits: 2,
    currency: 'BRL',
  })
}

export const ListShipping = () => {
  const shipping = useMemo(() => generateRandomNumberInterval(60, 150), [])
  return (
    <article className={styles.container}>
      <h3>Entrega Básica</h3>
      <div className={styles.content}>
        <span className={styles.subtitle}>Frete grátis </span>
        <p>neste vendedor nas compras a partir de</p>
        <span>{shipping}</span>
      </div>
    </article>
  )
}
