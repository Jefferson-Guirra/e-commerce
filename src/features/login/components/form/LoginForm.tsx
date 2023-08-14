import { Form, Modal } from '../../../../components'
import useForm from '../../../../Hooks/useForm'
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi'
import { useCallback, useState } from 'react'
import { AiOutlineLoading3Quarters, AiOutlineMail } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { HandleCookies } from '../../../../utils/handle-cookie'
import { Api } from '../../../../utils/api'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { BiRightArrowAlt } from 'react-icons/bi'
import styles from './styles.module.css'
import { HttpResponse } from '../../../../@types/request/http'
const apiUser = new Api()
const handleCookies = new HandleCookies()

interface Props {
  handleLoading: (state: boolean) => void
  loading: boolean
}
export const LoginForm = ({ handleLoading, loading }: Props) => {
  const [error, setError] = useState('')
  const [response, setResponse] = useState<HttpResponse | null>(null)
  const router = useRouter()
  const email = useForm('email')
  const password = useForm('password')

  const handleRemoveGlobalError = useCallback(() => {
    setError('')
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      handleLoading(true)
      setError('')
      const validateInputs = email.validate() && password.validate()

      if (validateInputs) {
        const response = await apiUser.send('login', 'PUT', {
          email: email.value,
          password: password.value,
        })

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

  const handleNextAuthLogin = () => {
    try {
      signIn('google', { callbackUrl: 'https://literando.vercel.app/Login' })
    } catch (err) {
      console.error(err)
    }
  }

  const handleResetPassword = async (userEmail: string) => {
    const data = await apiUser.send('reset-password-request', 'POST', {
      email: userEmail,
    })
    setResponse(data)
  }

  const handleCloseModal = useCallback(
    ({ target, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
      if (target === currentTarget) {
        setResponse(null)
      }
    },
    []
  )

  return (
    <>
      <Form.Root onSubmit={handleSubmit}>
        <Form.ActionButton
          disabled={loading}
          type="button"
          text="Google"
          onClick={() => handleNextAuthLogin()}
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
        {error === 'Email e ou senha incorretos.' && (
          <button
            className={styles.btn}
            type="button"
            onClick={() => handleResetPassword(email.value)}
          >
            esqueceu a senha?
          </button>
        )}
        <Form.Button
          disabled={loading}
          text="Entrar"
          type="submit"
          iconProps={{ Icon: BiRightArrowAlt, color: '#fafafa', size: 27 }}
        >
          <AiOutlineLoading3Quarters size={27} color="#fafafa" />
        </Form.Button>
      </Form.Root>
      {response && (
        <Modal.Request httpResponse={response} onClick={handleCloseModal}>
          <div className={styles['icon-email']}>
            <Modal.Icon icon={AiOutlineMail} size={45} color="#f31" />
          </div>
          <Modal.BtnClose onClick={() => setResponse(null)}>
            <Modal.Icon icon={IoClose} size={25} color="#fafafa" />
          </Modal.BtnClose>
        </Modal.Request>
      )}
    </>
  )
}
