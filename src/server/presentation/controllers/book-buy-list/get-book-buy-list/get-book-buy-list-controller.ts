import { GetBookBuyList } from '../../../../domain/usecases/book-buy-list/get-book-buy-list'
import { badRequest, ok } from '../../../helpers/http'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'

export class GetBookBuyListController implements Controller {
  constructor(
    private readonly validate: Validation,
    private readonly getBuyBook: GetBookBuyList
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validate.validation(httpRequest)
    if (error) {
      return badRequest(error)
    }
    const { accessToken, bookId } = httpRequest.body
    await this.getBuyBook.getBook(accessToken, bookId)
    return ok('success')
  }
}
