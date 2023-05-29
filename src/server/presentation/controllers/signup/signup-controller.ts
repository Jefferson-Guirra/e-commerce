import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccount } from '../../../domain/usecases/add-account'
import { badRequest, serverError, unauthorized } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { ok } from '../../helpers/http'

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
      const account = await this.addAccount.add({ username, email, password })
      if (!account) {
        return unauthorized()
      }
      return ok(account)
    } catch (err) {
      return serverError(err as Error)
    }
  }
}
