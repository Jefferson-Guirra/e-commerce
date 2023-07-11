import { Validation } from '../../../protocols/validate'
import { MissingParamError } from '../../../errors/missing-params-error'
export class GetBookListValidator implements Validation {
  validation(input: any): Error | undefined {
    const requiredFields = ['accessToken', 'bookId']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }
  }
}
