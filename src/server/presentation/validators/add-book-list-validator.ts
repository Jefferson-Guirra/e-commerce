import { MissingParamError } from '../errors/missing-params-error'
import { Validation } from '../protocols/validate'

export class AddBookListValidator implements Validation {
  validation(input: any): Error | undefined {
    const requiredFields = ['title', 'description', 'authors', 'price']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }
  }
}
