import { MissingParamError } from '../errors/missing-params-error'
import { Validation } from '../protocols/validate'

export class AddBookListValidator implements Validation {
  validation(input: any): Error | undefined {
    const fieldsRequest = Object.keys(input.body)
    const requiredFields = [
      'title',
      'description',
      'authors',
      'price',
      'language',
      'publisher',
      'publisherDate',
      'imgUrl',
      'accessToken',
      'bookId',
    ]
    for (const field of requiredFields) {
      if (!fieldsRequest.includes(field)) {
        return new MissingParamError(field)
      }
    }
  }
}
