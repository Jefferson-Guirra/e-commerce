import { AccountLogout } from '../../../domain/usecases/logout-account'
import { LoadAccountByAccessToken } from '../../protocols/db/account/load-account-by-access-token'

export class DbLogoutAccount implements AccountLogout {
  constructor(
    private readonly loadAccountByAccessToken: LoadAccountByAccessToken
  ) {}
  async logout(accessToken: string): Promise<string | undefined> {
    const account = await this.loadAccountByAccessToken.load(accessToken)
    if (!account) {
      return
    }
    return 'logout success'
  }
}
