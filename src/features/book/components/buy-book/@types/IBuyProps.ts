import { HttpResponse } from '../../../../../server/presentation/protocols/http'
import { IBookIdApi } from '../../../../../services/api/@types/IBookIdApi'
export interface IBuyProps {
  book: IBookIdApi
  accessToken: string
}
