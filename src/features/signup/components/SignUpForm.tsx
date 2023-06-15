import { useState } from 'react'
import Input from '../../../components/Input'
import { useRouter } from 'next/router'
import useForm from '../../../Hooks/useForm'
import { AiFillEye } from 'react-icons/ai'
import styles from '../../login/components/styles.module.css'
import { ApiUser } from '../../../utils/user-api'

const apiUser = new ApiUser()

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
    const validateInputs = email.validate() && password.validate()
    if (validateInputs) {
      try {
        setLoading(true)
        const response = await apiUser.post(
          {
            username: username.value,
            password: password.value,
            email: email.value,
          },
          'signup'
        )

        const statusCodeValidate: any = {
          200: () => router.push('/Login'),
          401: () => setError('Este endereço de email já foi cadastrado'),
          500: () => setError('Error interno'),
        }
        statusCodeValidate[response.statusCode]()
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false)
      }
    }
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
