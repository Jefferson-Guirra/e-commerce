import React from 'react'
import styles from './styles.module.css'

interface Props {
  label: string
  type: string
  name: string
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  erro: string | null
  setValue: React.Dispatch<React.SetStateAction<string>>
  onBlur: () => void
}
export const Input = ({
  label,
  type,
  name,
  onChange,
  value,
  erro,
  onBlur,
}: Props) => {
  return (
    <div className={styles.container}>
      <label className="label" htmlFor={name}>
        {label}
      </label>

      <input
        className={styles.input}
        id={name}
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />

      {erro && <p className={styles.error}>{erro}</p>}
    </div>
  )
}
