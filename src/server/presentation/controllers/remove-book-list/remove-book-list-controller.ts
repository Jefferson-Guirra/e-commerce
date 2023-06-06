import { RemoveBookList } from '../../../domain/usecases/book-list/remove-book-list'
import { badRequest, ok, unauthorized } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validate'

export class RemoveBookListController implements Controller {
  constructor(
    private readonly validate: Validation,
    private readonly removeBook: RemoveBookList
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validate.validation(httpRequest)
    if (error) {
      return badRequest(error)
    }
    const { accessToken, idBook } = httpRequest.body
    const removeBook = await this.removeBook.remove(accessToken, idBook)
    if (!removeBook) {
      return unauthorized()
    }
    return ok('success')
  }
}
