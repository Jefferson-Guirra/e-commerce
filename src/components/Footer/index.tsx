import styles from './styles.module.css'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerFooter}>
        <div>
          <AiOutlineCopyrightCircle size={30} />
          2022 Literando
        </div>
        <p>Todos os direitos reservados</p>
      </div>
    </footer>
  )
}

export default Footer
