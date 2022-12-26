import * as C from '../../styles/loginForm'
import useForm from '../../Hooks/useForm'
import Input from '../../components/Input'
import {GiBookshelf} from 'react-icons/gi'
import {FcGoogle} from 'react-icons/fc'
import { useRouter } from 'next/router'

const Login = () => {
  const password = useForm('password')
  const username = useForm('')
  const router = useRouter()
  const email = useForm('email')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(email.validate() && password.validate() ){
      router.push('/')
    }
    
  }
  return (
    <C.container>
      <section className="content">
        <GiBookshelf id="booksIcon" size={40} color="#001f3f" />
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit}>
          <Input label="Email:" name="username" type="text" {...email} />
          <Input label="Senha:" name="password" type="password" {...password} />
          <p>
            Ainda não possui conta?{' '}
            <span
              style={{ color: '#001f3f', fontWeight:'bold', cursor:'pointer' }}
              onClick={() => router.push('/Login/Cadastrar')}
            >
              Cadastre-se
            </span>
          </p>
          <button type="submit">Entrar</button>
          <button id="googleLogin">
            <FcGoogle size={25} /> Entrar com Google
          </button>
        </form>
      </section>
    </C.container>
  )
}

export default Login
