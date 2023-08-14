import styles from './styles.module.css'
import { Form, PresentationCover } from '../../../components'
import useForm from '../../../Hooks/useForm'
import { useState } from 'react'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'
import { BiRightArrowAlt } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { GiBookshelf } from 'react-icons/gi'
import Link from 'next/link'
import { Api } from '../../../utils/api'

export interface ResetProps {
  accessToken: string
}

const api = new Api()
export const ResetPassword = ({ accessToken }: ResetProps) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
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
          response.statusCode === 401 && setError('Ação não autorizada.')
          response.statusCode === 200 &&
            setMessage('Senha alteranda com successo.')
          response.statusCode === 500 &&
            setError('Error  interno tente novamente.')
        } else {
          password.changeError('senhas não correspodem.')
          passwordConfirmation.changeError('senhas não correspodem.')
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
    <section className={styles.container}>
      <article className={styles.content}>
        <header>
          <GiBookshelf
            className={styles['icon-book']}
            size={37}
            color="#001f3f"
          />
          <h2>Alterar Senha</h2>
        </header>
        <div className={styles.form}>
          <Form.Root onSubmit={handleSubmit}>
            <Form.InputPassword
              handleRemoveGlobalError={handleRemoveGlobalError}
              color="#3d4f58"
              size={25}
              invisible={PiEyeClosedLight}
              visible={PiEyeLight}
              label="Nova Senha"
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
            {message && (
              <Link className={styles['msg-success']} href="/Login">
                Senha alterada com successo.
                <span>Entrar na conta?</span>
              </Link>
            )}
            <Form.Button
              text=""
              type="submit"
              disabled={loading}
              iconProps={{ Icon: BiRightArrowAlt, color: '#fafafa', size: 27 }}
            >
              <AiOutlineLoading3Quarters size={27} color="#fafafa" />
            </Form.Button>
          </Form.Root>
        </div>
      </article>
      <PresentationCover url="/images/password-cover.jpg" />
    </section>
  )
}
