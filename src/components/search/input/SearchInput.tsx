import { InputHTMLAttributes, ReactNode } from 'react'

export const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <input {...props} />
    </>
  )
}
