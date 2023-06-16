import { UpdateAmountBuyBook } from '../../../../domain/usecases/book-buy-list/update-amount-book-buy-list'
import { badRequest, ok, unauthorized } from '../../../helpers/http'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'

export class UpdateAmountBookBuyListController implements Controller {
  constructor(
    private readonly validator: Validation,
    private readonly updateBuyBook: UpdateAmountBuyBook
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validation(httpRequest)
    if (error) {
      return badRequest(error)
    }
    const { accessToken, bookId, amount } = httpRequest.body
    const book = await this.updateBuyBook.updateAmount(
      accessToken,
      bookId,
      amount
    )
    if (!book) {
      return unauthorized()
    }
    return ok('success')
  }
}
