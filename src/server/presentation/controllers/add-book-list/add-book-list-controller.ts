import { AddBookListRepository } from '../../../data/protocols/db/book-list/add-book-list-repository'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validate'

export class AddBookListController implements Controller {
  constructor(
    private readonly validate: Validation,
    private readonly addBookList: AddBookListRepository
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate.validation(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const book = await this.addBookList.addBook(httpRequest.body)
      if (!book) {
        return unauthorized()
      }
      return await Promise.resolve(ok(book))
    } catch (err) {
      return serverError(err as Error)
    }
  }
}
