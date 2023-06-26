import styles from './styles.module.css'
import { useHeaderContext } from '../../../context/header/HeaderContext'
export const Hamburger = () => {
  const { dispatch, menuMob } = useHeaderContext()

  return (
    <article
      onClick={() => dispatch({ type: 'REVERT_MENU_MOB_STATE' })}
      className={styles.container}
    >
      <span
        className={menuMob ? `${styles.line1} ${styles.active}` : styles.line1}
      ></span>
      <span
        className={menuMob ? `${styles.line2} ${styles.active}` : styles.line2}
      ></span>
      <span
        className={menuMob ? `${styles.line3} ${styles.active}` : styles.line3}
      ></span>
    </article>
  )
}
