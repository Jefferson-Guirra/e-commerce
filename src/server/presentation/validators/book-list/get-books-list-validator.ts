import { MissingParamError } from '../../errors/missing-params-error'
import { Validation } from '../../protocols/validate'

export class GetBooksListValidator implements Validation {
  validation(input: any): Error | undefined {
    if (!input.body['accessToken']) {
      return new MissingParamError('accessToken')
    }
  }
}
