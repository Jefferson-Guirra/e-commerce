import { AccountLogout } from '../../../domain/usecases/logout-account'
import { LoadAccountByAccessToken } from '../../protocols/db/account/load-account-by-access-token'
import { RemoveAccessTokenRepository } from '../../protocols/db/account/remove-access-token-repository'

export class DbLogoutAccount implements AccountLogout {
  constructor(
    private readonly loadAccountByAccessToken: LoadAccountByAccessToken,
    private readonly removeAccessToken: RemoveAccessTokenRepository
  ) {}
  async logout(accessToken: string): Promise<string | undefined> {
    const account = await this.loadAccountByAccessToken.load(accessToken)
    if (!account) {
      return
    }
    this.removeAccessToken.remove(accessToken)
    return 'logout success'
  }
}
