import { ElementType } from 'react'

interface Props {
  icon: ElementType
  size: number
  color?: string
}

export const FormIcon = ({ icon: Icon, ...rest }: Props) => {
  return <Icon {...rest} />
}
