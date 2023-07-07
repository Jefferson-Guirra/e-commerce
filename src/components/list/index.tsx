import { ListButton } from './button/ListButton'
import { Root } from './root/Root'
import { ListHeader } from './header/Header'
import { ListHeaderCard } from './header/card/ListHeaderCard'
import { ListIcon } from './icon/ListIcon'
import { ListImg } from './img/ListImg'
import { ListDataBook } from './info/data-book/ListDataBook'
import { ListShipping } from './info/shipping/ListShipping'
import { ListInput } from './input/ListInput'
import { ListLink } from './link/ListLink'
import { ListResetRoot } from './root/reset/ListResetRoot'

export const List = {
  Root,
  Button: ListButton,
  Header: ListHeader,
  Icon: ListIcon,
  HeaderCard: ListHeaderCard,
  Input: ListInput,
  Link: ListLink,
  Img: ListImg,
  Data: ListDataBook,
  Shipping: ListShipping,
  Reset: {
    Root: ListResetRoot,
  },
}
