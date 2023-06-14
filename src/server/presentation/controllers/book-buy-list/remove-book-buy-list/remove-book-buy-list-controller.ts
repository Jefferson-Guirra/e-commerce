import { RemoveAmountBuyBook } from '../../../../domain/usecases/book-buy-list/remove-amount-book-buy-list'
import { badRequest, ok } from '../../../helpers/http'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'

export class RemoveAmountBuyBookListController implements Controller {
  constructor(
    private readonly validator: Validation,
    private readonly removeBookAmount: RemoveAmountBuyBook
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validation(httpRequest)
    if (error) {
      return badRequest(error)
    }
    const { accessToken, bookId } = httpRequest.body
    await this.removeBookAmount.removeAmount(accessToken, bookId)
    return await Promise.resolve(ok('success'))
  }
}
