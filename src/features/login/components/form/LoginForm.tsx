import { Form } from '../../../../components'
import useForm from '../../../../Hooks/useForm'
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { HandleCookies } from '../../../../utils/handle-cookie'
import { Api } from '../../../../utils/api'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { BiRightArrowAlt } from 'react-icons/bi'
const apiUser = new Api()
const handleCookies = new HandleCookies()

interface Props {
  handleLoading: (state: boolean) => void
  loading: boolean
}
export const LoginForm = ({ handleLoading, loading }: Props) => {
  const [error, setError] = useState('')
  const router = useRouter()
  const email = useForm('email')
  const password = useForm('password')

  const handleRemoveGlobalError = () => {
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      handleLoading(true)
      setError('')
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
        onClick={() => handleNextAuthLogin('http://localhost:3000/Login')}
      >
        <Form.Icon size={25} icon={FcGoogle} />
      </Form.ActionButton>
      <Form.Helper />
      <Form.InputText
        handleRemoveGlobalError={handleRemoveGlobalError}
        label="Email"
        id="email"
        name="email"
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
        text="Entrar"
        type="submit"
        iconProps={{ Icon: BiRightArrowAlt, color: '#fafafa', size: 27 }}
      >
        <AiOutlineLoading3Quarters size={27} color="#fafafa" />
      </Form.Button>
    </Form.Root>
  )
}
