import { GetBuyBooks } from '../../../../domain/usecases/book-buy-list/get-books-buy-list'
import { badRequest, ok } from '../../../helpers/http'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'

export class GetBuyBooksController implements Controller {
  constructor(
    private readonly validator: Validation,
    private readonly getBooks: GetBuyBooks
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validation(httpRequest)
    if (error) {
      return badRequest(error)
    }
    const { accessToken } = httpRequest.body
    await this.getBooks.getBuyBooks(accessToken)
    return ok('success')
  }
}
