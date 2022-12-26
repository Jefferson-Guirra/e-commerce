import useForm from "../../Hooks/useForm"
import Input from "../../components/Input"
import * as C from '../../styles/loginForm'
import {GiBookshelf} from 'react-icons/gi'
import {FcGoogle} from 'react-icons/fc'
import { useRouter } from "next/router"
import Head from "next/head"

const Cadastrar = () => {
  const router = useRouter()
  const username = useForm('')
  const email = useForm('email')
  const password = useForm('password')
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (email.validate() && password.validate()) {
        router.push('/')
      }
    }
  return (
    <>
      <Head>
        <title>Literando | cadastrar</title>
      </Head>
      <C.container>
        <section id="create" className="content">
          <GiBookshelf id='booksIcon'size={40} color="#001f3f" />
          <h1>Cadastrar</h1>
          <form onSubmit={handleSubmit}>
            <Input type="text" name="username" label="Usuário:" {...username} />
            <Input type="email" name="email" label="Email:" {...email} />
            <Input
              type="password"
              name="password"
              label="Senha:"
              {...password}
            />
            <button type="submit">Entrar</button>
            <button id="googleLogin"> <FcGoogle size={25} /> Entrar com Google</button>
          </form>
        </section>
      </C.container>
    </>
  )
}

export default Cadastrar


