import { MissingParamError } from '../../../errors/missing-params-error'
import { Validation } from '../../../protocols/validate'

export class RemoveBookListValidator implements Validation {
  validation(input: any): Error | undefined {
    const requiredFields = ['accessToken', 'idBook']

    for (const field of requiredFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }
  }
}