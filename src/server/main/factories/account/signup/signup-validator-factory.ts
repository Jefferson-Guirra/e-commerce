import { EmailValidation } from '../../../../presentation/helpers/validators/email-validator'
import { RequiredFieldValidator } from '../../../../presentation/helpers/validators/required-field-validator'
import { ValidatorComposite } from '../../../../presentation/helpers/validators/validator-composite'
import { Validation } from '../../../../presentation/protocols/validate'
import { EmailValidatorAdapter } from '../../../adapters/validators/email-validator-adapter'
export const makeSignupValidator = (): Validation => {
  const validators: Validation[] = []
  for (const field of ['username', 'email', 'password']) {
    validators.push(new RequiredFieldValidator(field))
  }

  validators.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validators)
}
