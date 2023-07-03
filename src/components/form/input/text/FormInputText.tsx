import { ChangeEvent, InputHTMLAttributes } from 'react'
import styles from '../styles.module.css'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleRemoveGlobalError: () => void
  setValue: React.Dispatch<React.SetStateAction<string>>
  validate: (value: string) => boolean
  label: string
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
  error: string | null
}

export const FormInputText = ({
  label,
  onChange: userFormOnChange,
  handleRemoveGlobalError,
  name,
  error,
  validate,
  setValue,
  ...rest
}: Props) => {
  const decoratorOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleRemoveGlobalError()
    userFormOnChange(e)
  }

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {' '}
        {label}
      </label>
      <input onChange={decoratorOnChange} {...rest} className={styles.input} />
      <p className={styles.error}>{error}</p>
    </div>
  )
}
