import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ReactNode } from 'react'
import { CSSProperties } from 'react'
import styles from './styles.module.css'

interface IProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
  svgColor?: string
  size: number
  type?: 'submit' | 'reset' | 'button' | undefined
  state: boolean
  onClick?: () => Promise<void> | void
}
export const Button = ({
  svgColor,
  state,
  size,
  children,
  ...props
}: IProps) => {
  return (
    <div className={styles.container}>
      {!state ? (
        <button {...props}>{children}</button>
      ) : (
        <button {...props} disabled>
          <AiOutlineLoading3Quarters size={`${size}px`} color={svgColor} />
        </button>
      )}
    </div>
  )
}
