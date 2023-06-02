import { ok } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validate'

export class AddBookListController implements Controller {
  constructor(private readonly validate: Validation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validate.validation(httpRequest)
    return await Promise.resolve(ok('any_body'))
  }
}
