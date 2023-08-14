import { ResetPassword, ResetProps } from '../pages/ResetPassword'
import styles from './styles.module.css'

export const ResetPasswordContainer = (props: ResetProps) => {
  return (
    <main className={styles.container}>
      <ResetPassword {...props} />
    </main>
  )
}
