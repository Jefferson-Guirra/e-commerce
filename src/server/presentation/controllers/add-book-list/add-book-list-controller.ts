import { AddBookListRepository } from '../../../data/protocols/db/book-list/add-book-repository'
import { badRequest, ok, serverError } from '../../helpers/http'
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
      await this.addBookList.addBook(httpRequest.body)
      return await Promise.resolve(ok('any_body'))
    } catch (err) {
      return serverError(err as Error)
    }
  }
}
