import { badRequest } from '../../helpers/http'
import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { RemoveBookListController } from './remove-book-list-controller'

const makeValidateStub = (): Validation => {
  class ValidateStub implements Validation {
    validation(input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidateStub()
}

interface sutTypes {
  validateStub: Validation
  sut: RemoveBookListController
}

const makeSut = (): sutTypes => {
  const validateStub = makeValidateStub()
  const sut = new RemoveBookListController(validateStub)
  return {
    validateStub,
    sut,
  }
}
describe('RemoveBookListController', () => {
  test('should call validation with correct values', async () => {
    const { validateStub, sut } = makeSut()
    const validationSpy = jest.spyOn(validateStub, 'validation')
    const makeFakeRequest: HttpRequest = {
      body: {
        accessToken: 'any_token',
        bookId: 'any_id',
      },
    }
    await sut.handle(makeFakeRequest)
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest)
  })

  test('should return badRequest if validation return error', async () => {
    const { sut, validateStub } = makeSut()
    jest
      .spyOn(validateStub, 'validation')
      .mockReturnValueOnce(new Error('any_field'))
    const makeFakeRequest: HttpRequest = {
      body: {
        accessToken: 'any_token',
        bookId: 'any_id',
      },
    }
    const response = await sut.handle(makeFakeRequest)
    expect(response).toEqual(badRequest(new Error('any_field')))
  })
})
