import { IAccountModel } from '../@types'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../helpers/firebaseConnection'

export const CreateUser = async ({
  id,
  username,
  email,
  password,
}: IAccountModel) => {
  await setDoc(doc(db, 'users', id), {
    username: username,
    password: password,
    email: email,
    id,
  })
}
