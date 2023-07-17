import { FormActionButton } from './button/action-button/FormActionButton'
import { FormButton } from './button/default-button/FormButton'
import { FormError } from './helpers/error/FormError'
import { FormUserHelper } from './helpers/user-helper/FormUserHelper'
import { FormIcon } from './icons/FormIcon'
import { FormInputPassword } from './input/password/FormInputPassword'
import { FormInputText } from './input/text/FormInputText'
import { FormRoot } from './root/FormRoot'

export const Form = {
  Root: FormRoot,
  Button: FormButton,
  ActionButton: FormActionButton,
  InputText: FormInputText,
  InputPassword: FormInputPassword,
  Icon: FormIcon,
  Helper: FormUserHelper,
  Error: FormError,
}
