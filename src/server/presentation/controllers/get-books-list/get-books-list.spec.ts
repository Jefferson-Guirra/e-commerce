import { MissingParamError } from '../../errors/missing-params-error'
import { badRequest } from '../../helpers/http'
import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { GetBooksListController } from './get-books-list-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accessToken: 'any_token',
  },
})
const makeValidateStub = (): Validation => {
  class ValidateStub implements Validation {
    validation(input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidateStub()
}
interface SutTypes {
  validateStub: Validation
  sut: GetBooksListController
}

const makeSut = (): SutTypes => {
  const validateStub = makeValidateStub()
  const sut = new GetBooksListController(validateStub)
  return {
    validateStub,
    sut,
  }
}
describe('GetBookList', () => {
  test('should call validate with correct values', async () => {
    const { validateStub, sut } = makeSut()
    const validateSpy = jest.spyOn(validateStub, 'validation')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return 400 if validate return error', async () => {
    const { sut, validateStub } = makeSut()
    jest
      .spyOn(validateStub, 'validation')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
