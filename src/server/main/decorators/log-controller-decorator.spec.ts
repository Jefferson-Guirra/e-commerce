import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { Controller } from '../../presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http'
import { LogControllerDecorator } from './log-controller-decorator'
import { ok } from '../../presentation/helpers/http'
import { AccountModel } from '../../domain/models/account'

const makeFakeAccount = (): AccountModel => {
  return {
    username: 'any_username',
    password: 'hashed_password',
    email: 'any_email@mail.com',
    id: 'any_id',
  }
}
const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return await Promise.resolve(ok(makeFakeAccount()))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositorySutb implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      await Promise.resolve(null)
    }
  }
  return new LogErrorRepositorySutb()
}
interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}
const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    controllerStub,
    logErrorRepositoryStub,
    sut,
  }
}
describe('LogControllerDecorator', () => {
  test('should call handle correct values', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const fakeRequest: HttpRequest = {
      body: {
        username: 'any_username',
        password: 'any_password',
        email: 'any_email@mail.com',
      },
    }
    await sut.handle(fakeRequest)
    expect(handleSpy).toHaveBeenCalledWith(fakeRequest)
  })
})
