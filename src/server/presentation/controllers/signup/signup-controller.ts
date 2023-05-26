import { InvalidParamsError } from '../../errors/invalid-params-error'
import { badRequest } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class SignupController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validateFields = ['username', 'email', 'password']
    for (const field of validateFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new InvalidParamsError(field))
      }
    }
    return {
      statusCode: 200,
      body: 'succeeds',
    }
  }
}
