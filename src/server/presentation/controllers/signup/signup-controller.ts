import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccount } from '../../../domain/usecases/add-account'
import { badRequest, serverError } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validate'

export class SignupController implements Controller {
  constructor(
    private readonly validate: Validation,
    private readonly addAccount: AddAccount
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate.validation(httpRequest)
      if (error) return badRequest(error)
      const { password, email, username } = httpRequest.body
      await this.addAccount.add({ username, email, password })
      return {
        statusCode: 200,
        body: 'succeeds',
      }
    } catch (err) {
      return serverError(err as Error)
    }
  }
}
