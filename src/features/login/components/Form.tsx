import styles from './styles.module.css'
import { useState } from 'react'
import Input from '../../../components/Input'
import useForm from '../../../Hooks/useForm'
import { useRouter } from 'next/router'
import { AiFillEye } from 'react-icons/ai'
import { ApiUser } from '../../../utils/user-api'
import { HandleCookies } from '../../../utils/handle-cookie'

const apiUser = new ApiUser()
const handleCookies = new HandleCookies()

export const UserForm = () => {
  const password = useForm('password')
  const router = useRouter()
  const email = useForm('email')
  const [error, setError] = useState<boolean | string>(false)
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
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
          handleCookies.insert(
            'literando_accessToken',
            response.body.accessToken
          )
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
      setLoading(false)
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
      {!loading ? (
        <button type="submit">Entrar</button>
      ) : (
        <button type="submit" disabled>
          Entrando...
        </button>
      )}
    </form>
  )
}
