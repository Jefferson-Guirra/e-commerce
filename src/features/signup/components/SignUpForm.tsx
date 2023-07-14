import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/router'
import useForm from '../../../Hooks/useForm'
import { Api } from '../../../utils/api'
import { useCallback, useState } from 'react'
import { Form } from '../../../components'
import { signIn } from 'next-auth/react'
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi'
import { BiRightArrowAlt } from 'react-icons/bi'

interface Props {
  loading: boolean
  handleLoading: (state: boolean) => void
}
const apiUser = new Api()

export const SignUpForm = ({ handleLoading, loading }: Props) => {
  const router = useRouter()
  const username = useForm('default')
  const email = useForm('email')
  const [error, setError] = useState('')
  const password = useForm('password')

  const handleRemoveGlobalError = useCallback(() => {
    setError('')
  }, [])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validateInputs =
      email.validate() && password.validate() && username.validate()
    if (validateInputs) {
      try {
        setError('')
        handleLoading(true)
        const response = await apiUser.post(
          {
            username: username.value,
            password: password.value,
            email: email.value,
          },
          'account/signup'
        )

        const statusCodeValidate: any = {
          200: () => router.push('/Login'),
          401: () => setError('Endereço de email já cadastrado'),
          500: () => setError('Error interno'),
        }
        statusCodeValidate[response.statusCode]()
      } catch (err) {
        alert(err)
      } finally {
        handleLoading(false)
      }
    }
  }

  const handleNextAuthLogin = (callbackUrl: string) => {
    try {
      signIn('google', { callbackUrl })
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Form.Root onSubmit={handleSubmit}>
      <Form.ActionButton
        disabled={loading}
        text="Google"
        type="button"
        onClick={() => handleNextAuthLogin('http://localhost:3000/Login')}
      >
        <Form.Icon size={25} icon={FcGoogle} />
      </Form.ActionButton>
      <Form.Helper />
      <Form.InputText
        label="Usuário"
        id="username"
        type="text"
        handleRemoveGlobalError={handleRemoveGlobalError}
        {...username}
      />
      <Form.InputText
        label="Email"
        type="email"
        handleRemoveGlobalError={handleRemoveGlobalError}
        {...email}
      />
      <Form.InputPassword
        handleRemoveGlobalError={handleRemoveGlobalError}
        color="#3d4f58"
        size={25}
        invisible={PiEyeClosedLight}
        visible={PiEyeLight}
        label="Senha"
        id="senha"
        name="senha"
        {...password}
      />
      {error && <Form.Error text={error} />}
      <Form.Button
        disabled={loading}
        text="Cadastrar"
        type="submit"
        iconProps={{ Icon: BiRightArrowAlt, color: '#fafafa', size: 27 }}
      >
        <AiOutlineLoading3Quarters size={27} color="#fafafa" />
      </Form.Button>
    </Form.Root>
  )
}
