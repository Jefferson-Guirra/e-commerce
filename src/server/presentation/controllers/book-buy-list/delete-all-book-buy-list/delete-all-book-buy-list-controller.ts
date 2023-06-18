import { DeleteAllBuyBookList } from '../../../../domain/usecases/book-buy-list/delete-all-book-buy-list'
import { badRequest, ok, unauthorized } from '../../../helpers/http'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'

export class DeleteAllBuyBooKListController implements Controller {
  constructor(
    private readonly validator: Validation,
    private readonly deleteAllBuyBooks: DeleteAllBuyBookList
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validation(httpRequest)
    if (error) {
      return badRequest(error)
    }
    const { accessToken } = httpRequest.body
    const validate = await this.deleteAllBuyBooks.deleteAllBooks(accessToken)
    if (validate === null) {
      return unauthorized()
    }
    return ok('success')
  }
}
