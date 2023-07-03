import { ElementType, InputHTMLAttributes, useState, ChangeEvent } from 'react'
import styles from '../styles.module.css'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleRemoveGlobalError: () => void
  validate: (value: string) => boolean
  setValue: React.Dispatch<React.SetStateAction<string>>
  visible: ElementType
  invisible: ElementType
  size: number
  color: string
  label: string
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
  error: string | null
}

export const FormInputPassword = ({
  setValue,
  validate,
  onChange: userFormChange,
  handleRemoveGlobalError,
  label,
  error,
  size,
  color,
  name,
  type,
  visible: Visible,
  invisible: Invisible,
  ...rest
}: Props) => {
  const [hidden, setHidden] = useState(false)
  const handleIcon = () => {
    setHidden((state) => !state)
  }

  const decoratorOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleRemoveGlobalError()
    userFormChange(e)
  }
  return (
    <div className={styles.container}>
      <span onClick={handleIcon}>
        {!hidden ? (
          <Invisible size={size} color={color} />
        ) : (
          <Visible size={size} color={color} />
        )}
      </span>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        onChange={decoratorOnChange}
        className={styles.input}
        id={name}
        type={!hidden ? 'password' : 'text'}
      />
      <p className={styles.error}>{error}</p>
    </div>
  )
}
