import { ElementType } from 'react'

interface Props {
  icon: ElementType
  size: number
  color: string
}

const Icon = ({ icon: Icon, ...rest }: Props) => {
  return <Icon {...rest} />
}

export default Icon
