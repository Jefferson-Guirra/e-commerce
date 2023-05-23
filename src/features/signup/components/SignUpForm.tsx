import { useState } from 'react'
import Input from '../../../components/Input'
import { useRouter } from 'next/router'
import useForm from '../../../Hooks/useForm'
import { AiFillEye } from 'react-icons/ai'
import { v4 as uuid } from 'uuid'
import {
  VALIDATE_USER_CREATE,
  CREATE_USER,
} from '../../../services/db/usecases/FirebaseFunctions'
import styles from '../../login/components/styles.module.css'

export const SignUpForm = () => {
  const router = useRouter()
  const username = useForm('')
  const email = useForm('email')
  const password = useForm('password')
  const [error, setError] = useState<boolean | string>('')
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const validateInputs = email.validate() && password.validate()
    const { error, validate } = await VALIDATE_USER_CREATE({
      username: username.value,
      email: email.value,
    }).validateUser
    if (validateInputs && validate) {
      const keyUser = uuid()
      await CREATE_USER({
        email: email.value,
        username: username.value,
        id: keyUser,
        password: password.value,
      })
      router.push('/Login')
    } else if (validateInputs) {
      setError(error)
    }
    setLoading(false)
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input type="text" name="username" label="Usuário:" {...username} />
      <Input type="email" name="email" label="Email:" {...email} />
      <div className={styles.passwordContainer}>
        <Input
          type={!hidden ? 'password' : 'text'}
          name="password"
          label="Senha:"
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
      {!loading ? (
        <button type="submit">Cadastrar</button>
      ) : (
        <button disabled type="submit">
          Cadastrando...
        </button>
      )}
    </form>
  )
}
