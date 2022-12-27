import * as C from '../../styles/loginForm'
import useForm from '../../Hooks/useForm'
import Input from '../../components/Input'
import {useState} from 'react'
import {GiBookshelf} from 'react-icons/gi'
import {FcGoogle} from 'react-icons/fc'
import { useRouter } from 'next/router'
import { GET_USER } from '../../services/helper/FirebaseFunctions'

const Login = () => {
  const password = useForm('password')
  const username = useForm('')
  const router = useRouter()
  const email = useForm('email')
  const [error,setError] = useState<boolean | string>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validateInputs = email.validate() && password.validate()
    const {error,validate,user} = await GET_USER(email.value,password.value).validateLogin

    if( validateInputs && validate ){
      const userLogin = {
        username:user?.username,
        token:user?.id
      }
      localStorage.setItem('user',JSON.stringify(userLogin))
      router.push('/')
    }
    else if(validateInputs){
      setError(error)
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
          {error && <p className='error'>{error}</p>}
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
