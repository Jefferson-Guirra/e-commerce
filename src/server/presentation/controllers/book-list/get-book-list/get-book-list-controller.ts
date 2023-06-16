import { GetBookList } from '../../../../domain/usecases/book-list/get-book-list'
import { badRequest, ok } from '../../../helpers/http'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'

export class GetBookListController implements Controller {
  constructor(
    private readonly validator: Validation,
    private readonly findBook: GetBookList
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validation(httpRequest)
    if (error) {
      return badRequest(error)
    }
    const { accessToken, bookId } = httpRequest.body
    await this.findBook.getBook(accessToken, bookId)
    return ok('success')
  }
}
