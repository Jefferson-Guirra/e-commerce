import React from 'react'

type Validate =(value:string)=>boolean

type Props ={
  [key:string]:{
    regex:any,
    message: string,
    number?:{
      regex:any,
      message:string
    }
  }
}

const types : Props = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido.',
    number:{
      regex: /^\d+$/,
      message: 'Utilize apenas números.'
    }
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      'A senha deve conter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.'
  }
}

const useForm = (type:string | boolean) => {
  const [value, setValue] = React.useState('')
  const [erro, setError] = React.useState<string | null>(null)
  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setValue(target.value)
    if (erro) validate(target.value)
  }

  const validate:Validate = (value:string)=> {
    if (type === false) return true

    if (value.length === 0) {
      setError('Campo Obrigatório.')
      return false
    } else if (typeof type !== 'boolean' && types[type] && !types[type].regex.test(value)) {
      setError(types[type].message)
      return false
    } else {
      setError(null)
      return true
    }
  }
  return {
    value,
    setValue,
    onChange,
    erro,
    validate: () => validate(value),
    onBlur: () => validate(value)
  }
}

export default useForm
