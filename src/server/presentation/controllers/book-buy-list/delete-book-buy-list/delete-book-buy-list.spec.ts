import { MissingParamError } from '../../../errors/missing-params-error'
import { badRequest } from '../../../helpers/http'
import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validate'
import { DeleteBuyBookListController } from './delete-book-buy-list-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
    bookId: 'any_id',
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
  sut: DeleteBuyBookListController
}
const makeSut = (): SutTypes => {
  const validatorStub = makeValidatorStub()
  const sut = new DeleteBuyBookListController(validatorStub)
  return {
    validatorStub,
    sut,
  }
}
describe('DeleteBuyBookList', () => {
  test('should call validation wit correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validationSpy = jest.spyOn(validatorStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return 400 if validation return a error', async () => {
    const { sut, validatorStub } = makeSut()
    jest
      .spyOn(validatorStub, 'validation')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
