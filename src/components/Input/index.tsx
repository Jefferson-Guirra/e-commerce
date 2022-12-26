import React from 'react'
import * as C from './styles'

interface Props {
  label: string
  type: string
  name: string
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  erro: string | null
  setValue: React.Dispatch<React.SetStateAction<string>>
  onBlur: () => void
}
const Input = ({
  label,
  type,
  name,
  onChange,
  setValue,
  value,
  erro,
  onBlur
}:Props) => {
  return (
    <C.container>
      <label className='label' htmlFor={name}>
        {label}
      </label>

      <input
        className='input'
        id={name}
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />

      {erro && <p className='error' >{erro}</p>}
    </C.container>
  )
}

export default Input
