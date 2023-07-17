import { ElementType } from 'react'

interface Props {
  icon: ElementType
  size: number
  color: string
}
export const ButtonIcon = ({ icon: Icon, ...rest }: Props) => {
  return <Icon {...rest} />
}
