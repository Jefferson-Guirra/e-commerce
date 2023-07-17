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
      <div className={styles.content}>
        <h2 className={styles.subtitle}>Frete grátis </h2>
        <p>
          neste vendedor nas compras a partir de
          <span>{shipping}</span>
        </p>
      </div>
    </article>
  )
}
