import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../helpers/firebaseConnection'
import { IArguments } from '../@types'
export const RemoveBook = async ({ id, idCollection }: IArguments) => {
  await deleteDoc(doc(db, idCollection, id))
}
