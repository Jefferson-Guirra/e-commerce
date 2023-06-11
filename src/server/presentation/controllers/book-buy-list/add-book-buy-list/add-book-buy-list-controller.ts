import { AddBookBuyList } from '../../../../domain/usecases/book-buy-list/add-book-buy-list'
import { badRequest, ok, unauthorized } from '../../../helpers/http'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'

export class AddBookBuyListController implements Controller {
  constructor(
    private readonly validator: Validation,
    private readonly addBook: AddBookBuyList
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validation(httpRequest)
    if (error) {
      return badRequest(error)
    }

    const book = await this.addBook.add(httpRequest.body)
    if (!book) {
      return unauthorized()
    }
    return await Promise.resolve(ok('success'))
  }
}
