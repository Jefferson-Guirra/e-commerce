import { AddBookModel } from '../../../domain/usecases/book-list/add-book-list'
import { RemoveBookList } from '../../../domain/usecases/book-list/remove-book-list'
import { badRequest } from '../../helpers/http'
import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validate'
import { RemoveBookListController } from './remove-book-list-controller'

const makeFakeAddBookModel = (): AddBookModel => {
  return {
    title: 'any_title',
    description: 'any_description',
    authors: ['any_author'],
    price: 0.0,
    language: 'any_language',
    publisher: 'any_publisher',
    date: 1254632254,
    publisherDate: 'any_date',
    imgUrl: 'any_url',
    id: 'any_id',
    userId: 'any_user_id',
    queryDoc: 'any_user_idany_id',
  }
}
const makeRemoveBookStub = (): RemoveBookList => {
  class RemoveBookStub implements RemoveBookList {
    async remove(
      accessToken: string,
      idBook: string
    ): Promise<AddBookModel | undefined> {
      return await Promise.resolve(makeFakeAddBookModel())
    }
  }
  return new RemoveBookStub()
}
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
  removeBookStub: RemoveBookList
  sut: RemoveBookListController
}

const makeSut = (): sutTypes => {
  const validateStub = makeValidateStub()
  const removeBookStub = makeRemoveBookStub()
  const sut = new RemoveBookListController(validateStub, removeBookStub)
  return {
    validateStub,
    removeBookStub,
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

  test('should call remove with correct values', async () => {
    const { sut, removeBookStub } = makeSut()
    const removeSpy = jest.spyOn(removeBookStub, 'remove')
    const makeFakeRequest: HttpRequest = {
      body: {
        accessToken: 'any_token',
        idBook: 'any_id',
      },
    }
    await sut.handle(makeFakeRequest)
    expect(removeSpy).toHaveBeenLastCalledWith('any_token', 'any_id')
  })
})
