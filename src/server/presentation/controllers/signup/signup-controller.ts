import { InvalidParamsError } from '../../errors/invalid-params-error'
import { badRequest } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class SignupController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username } = httpRequest.body
    if (!username) return badRequest(new InvalidParamsError('username'))
    return {
      statusCode: 200,
      body: 'succeeds',
    }
  }
}
