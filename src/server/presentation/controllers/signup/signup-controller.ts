import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validate'

export class SignupController implements Controller {
  constructor(private readonly validate: Validation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validate.validation(httpRequest)
    return {
      statusCode: 200,
      body: 'succeeds',
    }
  }
}
