import { Validation } from '../../../protocols/validate'
import { MissingParamError } from '../../../errors/missing-params-error'
export class Validate implements Validation {
  validation(input: any): Error | undefined {
    const validateFields = ['email', 'password', 'username']
    for (const field of validateFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }
  }
}
