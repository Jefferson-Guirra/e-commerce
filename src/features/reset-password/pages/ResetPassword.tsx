import styles from './styles.module.css'
import { Form } from '../../../components'
import useForm from '../../../Hooks/useForm'
import { useState } from 'react'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'
import { BiRightArrowAlt } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Api } from '../../../utils/api'

export interface ResetProps {
  accessToken: string
}

const api = new Api()
export const ResetPassword = ({ accessToken }: ResetProps) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const password = useForm('password')
  const passwordConfirmation = useForm('password')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true)
      e.preventDefault()
      const validate = password.validate() && passwordConfirmation.validate()
      if (validate) {
        if (password.value === passwordConfirmation.value) {
          const response = await api.send('reset-password', 'PUT', {
            accessToken,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value,
          })
          response.statusCode !== 200 && setError('Ação não autorizada.')
        } else {
          password.changeError('Senhas não conrrespodem.')
          passwordConfirmation.changeError('Senhas não conrrespodem.')
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  const handleRemoveGlobalError = () => {
    setError('')
  }
  return (
    <>
      <section className={styles.container}>
        <h1> Mudar senha</h1>
        <article className={styles.form}>
          <Form.Root onSubmit={handleSubmit}>
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
            <Form.InputPassword
              handleRemoveGlobalError={handleRemoveGlobalError}
              color="#3d4f58"
              size={25}
              invisible={PiEyeClosedLight}
              visible={PiEyeLight}
              label="Confirmar Senha"
              id="confirmar"
              name="confirmar"
              {...passwordConfirmation}
            />
            {error && <Form.Error text={error} />}
            <Form.Button
              text=""
              type="submit"
              disabled={loading}
              iconProps={{ Icon: BiRightArrowAlt, color: '#fafafa', size: 27 }}
            >
              <AiOutlineLoading3Quarters size={27} color="#fafafa" />
            </Form.Button>
          </Form.Root>
        </article>
      </section>
    </>
  )
}
