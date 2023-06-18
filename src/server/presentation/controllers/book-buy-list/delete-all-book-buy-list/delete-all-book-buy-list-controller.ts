import { ok } from '../../../helpers/http'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'

export class DeleteAllBuyBooKListController implements Controller {
  constructor(private readonly validator: Validation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validator.validation(httpRequest)
    return ok('success')
  }
}
