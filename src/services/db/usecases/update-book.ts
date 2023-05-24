import { IGetBookProps } from '../@types'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../helpers/firebaseConnection'

export const UpdateBook = async ({
  idBook,
  collection,
  tokenUser,
  value,
}: IGetBookProps) => {
  const docRef = doc(db, collection, idBook + tokenUser)

  await updateDoc(docRef, {
    qtd: value + 1,
  })
}
