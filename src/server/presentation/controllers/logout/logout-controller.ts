import { AccountLogout } from '../../../domain/usecases/logout-account'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validate'

export class LogoutController implements Controller {
  constructor(
    private readonly validate: Validation,
    private readonly accountLogout: AccountLogout
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate.validation(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const { accessToken } = httpRequest.body
      const logout = await this.accountLogout.logout(accessToken)
      if (!logout) {
        return unauthorized()
      }
      return Promise.resolve(ok('logout success'))
    } catch (err) {
      return Promise.resolve(serverError(err as Error))
    }
  }
}
