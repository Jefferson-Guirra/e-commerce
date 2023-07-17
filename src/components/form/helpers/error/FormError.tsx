interface Props {
  text: string
}

export const FormError = ({ text }: Props) => {
  return (
    <p
      style={{
        color: '#f31',
        fontSize: '0.875rem',
      }}
    >
      {text}
    </p>
  )
}
