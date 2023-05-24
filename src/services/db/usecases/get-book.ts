import { doc, getDoc } from 'firebase/firestore'
import { db } from '../helpers/firebaseConnection'
import { IGetBookProps } from '../@types'
export const GetBook = async ({
  idBook,
  tokenUser,
  collection,
}: IGetBookProps) => {
  const docRef = doc(db, collection, idBook + tokenUser)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return true
  } else {
    return false
  }
}
