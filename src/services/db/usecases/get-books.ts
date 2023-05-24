import { collection, getDocs, where, query, orderBy } from 'firebase/firestore'
import { IArguments } from '../@types'
import { db } from '../helpers/firebaseConnection'
export const GetBooks = async ({ id, idCollection }: IArguments) => {
  const ref = collection(db, idCollection)
  const books = await getDocs(
    query(ref, where('userId', '==', id), orderBy('created', 'desc'))
  ).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }))
    return newData
  })

  return books
}
