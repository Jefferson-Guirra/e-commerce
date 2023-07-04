import { ButtonHTMLAttributes, ElementType, ReactNode } from 'react'
import styles from '../styles.module.css'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  iconProps?: {
    Icon: ElementType
    size: number
    color: string
  }
  children: ReactNode
}
export const FormButton = ({
  text,
  children,
  iconProps: IconProps,
  ...rest
}: Props) => {
  return (
    <>
      {!rest.disabled ? (
        <button className={styles.btn} {...rest}>
          {text}
          {IconProps && (
            <IconProps.Icon size={IconProps.size} color={IconProps.color} />
          )}
        </button>
      ) : (
        <button className={styles.btn} {...rest}>
          {children}
        </button>
      )}
    </>
  )
}
