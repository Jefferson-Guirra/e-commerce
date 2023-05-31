import { badRequest, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validate'

export class LoginController implements Controller {
  constructor(private readonly validate: Validation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate.validation(httpRequest)
      if (error) {
        return badRequest(error)
      }
      return await Promise.resolve({ statusCode: 200, body: 'any_body' })
    } catch (err) {
      return serverError(err as Error)
    }
  }
}
