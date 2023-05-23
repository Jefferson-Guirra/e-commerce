import styles from './styles.module.css'
import { useState } from 'react'
import Input from '../../../components/Input'
import useForm from '../../../Hooks/useForm'
import { GET_USER } from '../../../services/db/usecases/FirebaseFunctions'
import { useRouter } from 'next/router'
import { AiFillEye } from 'react-icons/ai'
import { useUserContext } from '../../../context/user/UserContext'

export const UserForm = () => {
  const password = useForm('password')
  const router = useRouter()
  const email = useForm('email')
  const [error, setError] = useState<boolean | string>(false)
  const { createCookie, getPurchaseList } = useUserContext()
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const validateInputs = email.validate() && password.validate()
    const { error, validate, user } = await GET_USER(
      email.value,
      password.value
    ).validateLogin

    if (validateInputs && validate && user) {
      const userLogin = {
        username: user.username.replace(/\s\w+/g, ''),
        token: user.id,
      }
      createCookie('user', JSON.stringify(userLogin))
      getPurchaseList({ id: user.id, idCollection: 'buyBooks' })
      router.push('/')
    } else if (validateInputs) {
      setError(error)
    }
    setLoading(false)
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
      {error && !email.erro && !password.erro && (
        <p className="userErro">{error}</p>
      )}
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
          Entando...
        </button>
      )}
    </form>
  )
}
