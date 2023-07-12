import { MissingParamError } from '../../../errors/missing-params-error'
import { Validation } from '../../../protocols/validate'

export class GetBookBuyListValidator implements Validation {
  validation(input: any): Error | undefined {
    const requiredFields = ['accessToken', 'bookId']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }
  }
}