import * as C from './styles'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'

const Footer = () => {
  return (
    <C.footer>
      <div className="containerFooter">
        <div>
          <AiOutlineCopyrightCircle size={30} />
          2022 Literando
        </div>
        <p>Todos os direitos reservados</p>
      </div>
    </C.footer>
  )
}

export default Footer
