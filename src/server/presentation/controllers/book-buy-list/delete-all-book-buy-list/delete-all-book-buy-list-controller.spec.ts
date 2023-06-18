import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { DeleteAllBuyBooKListController } from './delete-all-book-buy-list-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
  },
})

const makeValidatorStub = (): Validation => {
  class ValidatorStub implements Validation {
    validation(input: any): Error | undefined {
      return
    }
  }
  return new ValidatorStub()
}

interface SutTypes {
  validatorStub: Validation
  sut: DeleteAllBuyBooKListController
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidatorStub()
  const sut = new DeleteAllBuyBooKListController(validatorStub)
  return {
    validatorStub,
    sut,
  }
}

describe('DeleteAllBuyBooKListController', () => {
  test('should call validation wit correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validationSpy = jest.spyOn(validatorStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
})
