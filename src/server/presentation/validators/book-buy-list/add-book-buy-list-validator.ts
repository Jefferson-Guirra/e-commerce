import { MissingParamError } from '../../errors/missing-params-error'
import { Validation } from '../../protocols/validate'

export class AddBookBuyListValidator implements Validation {
  validation(input: any): Error | undefined {
    const fieldArray = Object.keys(input?.body)
    const requiredFields = [
      'accessToken',
      'bookId',
      'authors',
      'description',
      'title',
      'imgUrl',
      'language',
      'price',
      'publisher',
    ]
    for (const field of requiredFields) {
      if (!fieldArray.includes(field)) {
        return new MissingParamError(field)
      }
    }
  }
}
