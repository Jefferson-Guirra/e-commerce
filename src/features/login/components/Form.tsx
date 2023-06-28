import styles from './styles.module.css'
import { useState } from 'react'
import { Input, Button } from '../../../components'
import useForm from '../../../Hooks/useForm'
import { useRouter } from 'next/router'
import { AiFillEye } from 'react-icons/ai'
import { Api } from '../../../utils/api'
import { HandleCookies } from '../../../utils/handle-cookie'
import { AiOutlineLogin } from 'react-icons/ai'

interface IProps {
  loading: boolean
  handleLoading: (state: boolean) => void
}
const apiUser = new Api()
const handleCookies = new HandleCookies()

export const UserForm = ({ handleLoading, loading }: IProps) => {
  const password = useForm('password')
  const router = useRouter()
  const email = useForm('email')
  const [error, setError] = useState<boolean | string>(false)
  const [hidden, setHidden] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      handleLoading(true)
      setError(false)
      const validateInputs = email.validate() && password.validate()

      if (validateInputs) {
        const response = await apiUser.post(
          {
            email: email.value,
            password: password.value,
          },
          'login'
        )

        const handleLogin = () => {
          const { accessToken, username } = response.body

          handleCookies.insert('literando_accessToken', accessToken)
          handleCookies.insert('literando_username', username)
          router.push('/')
        }

        const statusCodeValidate: any = {
          200: () => handleLogin(),
          401: () => setError('Email e ou senha incorretos.'),
          500: () => setError('Error interno'),
        }

        statusCodeValidate[response.statusCode]()
      }
    } finally {
      handleLoading(false)
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input label="Email:" name="username" type="email" {...email} />

      <div className={styles.passwordContainer}>
        <Input
          label="Senha:"
          name="password"
          type={!hidden ? 'password' : 'text'}
          {...password}
        />
        <span
          className={styles.passwordIcon}
          onClick={() => setHidden((state) => !state)}
        >
          <AiFillEye size={25} color="#363636" />
        </span>
      </div>
      {error && <p className={styles.userErro}>{error}</p>}
      <p>
        Ainda não possui conta?{' '}
        <span
          style={{
            color: '#001f3f',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/SignUp')}
        >
          Cadastre-se
        </span>
      </p>
      <Button state={loading} type="submit" size={25}>
        <>
          <AiOutlineLogin size={25} />
          <p>Entrar</p>
        </>
      </Button>
    </form>
  )
}
