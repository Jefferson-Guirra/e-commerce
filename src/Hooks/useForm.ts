import { useState } from 'react'

type Props = 'default' | 'email' | 'password'

const ValidateValue = (value: string, type: Props) => {
  const validations = {
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: value.length >= 6,
    default: value.length >= 1,
  }
  const validate = {
    email: validations.email.test(value),
    default: validations.default,
    password: validations.password,
  }
  return validate[type]
}

const errorMessage = (value: string, type: Props) => {
  const defaultErrorMessage = 'Campo obrigatório.'
  const message = {
    email:
      value.length === 0 ? defaultErrorMessage : 'Preencha um email válido.',
    default: defaultErrorMessage,
    password:
      value.length === 0
        ? defaultErrorMessage
        : 'Senha deve ter no mínimo 6 caracteres.',
  }
  return message[type]
}

const useForm = (type: Props) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string>('')
  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setValue(target.value)
    if (error) validate(target.value)
  }

  const validate = (value: string): boolean => {
    const validation = ValidateValue(value, type)
    if (!validation) {
      setError(errorMessage(value, type))
    } else {
      setError('')
    }
    return validation
  }

  const changeError = (value: string): void => {
    setError(value)
  }

  return {
    value,
    setValue,
    onChange,
    error,
    changeError,
    validate: () => validate(value),
    onBlur: () => validate(value),
  }
}

export default useForm
