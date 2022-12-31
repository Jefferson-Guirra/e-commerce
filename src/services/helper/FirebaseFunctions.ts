import { db } from '../firebaseConnection'
import {
  collection,
  query,
  getDocs,
  getDoc,
  where,
  deleteDoc,
  addDoc,
  setDoc,
  orderBy,
  doc
} from 'firebase/firestore'
import { Book } from '../../Types/Books'


type Arguments = {
  id: string
  idCollection: string
}

type Users = {
  username?: string
  email?: string
}
type User = {
  id: string
  username: string
  email: string
  password: string
}

type GetBookDatabase = {
  idBook: string
  tokenUser: string

}
type AddBookDatabase = {
  idBook: string
  tokenUser: string
  book: Book
  collection: string
}

type AddBookBuyList = {
  userId:string,
  book:Book
}

export const VALIDATE_USER_CREATE = ({ username, email }: Users) => {
  const ref = collection(db, 'users')
  let error: string | boolean = false
  let validate = true

  const validateUsername = async () => {
    const users = await getDocs(
      query(ref, where('username', '==', username))
    ).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }))
      return newData
    })

    if (users.length > 0) {
      validate = false
      error = 'Nome de usuário já cadastrado'
    }
  }

  const validateEmail = async () => {
    const validateEmail = await getDocs(
      query(ref, where('email', '==', email))
    ).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }))
      return newData
    })

    if (validateEmail.length > 0) {
      validate = false
      error = 'Email já cadastrado'
    }
  }

  const initUserCreate: () => Promise<{
    error: string | boolean
    validate: boolean
  }> = async () => {
    await validateUsername()
    await validateEmail()
    return {
      error,
      validate
    }
  }
  const validateUser = initUserCreate()

  return {
    validateUser
  }
}

export const CREATE_USER = async ({ id, username, email, password }: User) => {
  await setDoc(doc(db, 'users', id), {
    username: username,
    password: password,
    email: email,
    id
  })
}

export const GET_USER = (email: string, password: string) => {
  const ref = collection(db, 'users')
  let user: User | null = null
  let validate = true
  let error: string | boolean = false

  const validateEmail = async () => {
    const emailUser = await getDocs(
      query(ref, where('email', '==', email))
    ).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }))
      return newData
    })
    if (emailUser.length === 0) {
      validate = false
      error = 'O email que você inseriu não está conectado a uma conta.'
    }
    user = emailUser[0] as User
  }
  const validatePassword = async () => {
    const userPassword = await getDocs(
      query(ref, where('email', '==', email))
    ).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data()
      }))
      return newData
    })

    if (userPassword.length > 0 && userPassword[0].password !== password) {
      validate = false
      error = 'Senha incorreta'
    }
    user = userPassword[0] as User
  }

  const initValidateUser: () => Promise<{
    error: string | boolean
    validate: boolean
    user: User | null
  }> = async () => {
    await validateEmail()
    await validatePassword()
    return {
      error,
      user,
      validate
    }
  }
  const validateLogin = initValidateUser()

  return {
    validateLogin
  }
}

export const GET_BOOK_DATABASE = async ({
  idBook,
  tokenUser
}: GetBookDatabase) => {
  const docRef = doc(db, 'books', idBook + tokenUser)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return true
  } else {
    return false
  }
}

export const ADD_BOOK_DATABASE = async ({
  idBook,
  tokenUser,
  book,
  collection 
}: AddBookDatabase) => {
  await setDoc(doc(db, collection, idBook + tokenUser), {
    ...book,
    created: new Date(),
    idDoc: idBook + tokenUser,
    userId: tokenUser
  })
}

export const GET_BOOKS_DATABASE = async ({id,idCollection}:Arguments) => {
  const ref = collection(db, idCollection)
  const books = await getDocs(
    query(ref, where('userId', '==', id), orderBy('created', 'desc'))
  ).then(querySnapshot => {
    const newData = querySnapshot.docs.map(doc => ({
      ...doc.data()
    }))
    return newData
  })

  return books
}

export const REMOVE_BOOK_DATABASE = async ({
  id,
  idCollection
}:Arguments) => {
  await deleteDoc(doc(db, idCollection, id))
}


export const ADD_BOOK_BUY_LIST = async ({book,userId}:AddBookBuyList)=>{
  await addDoc(collection(db, 'buyBooks'),{
    ...book,
    created:new Date(),
    userId
  })
}

export const GET_BOOKS_BUY_LIST = async ({id,idCollection}:Arguments) => {
  const ref = collection(db, idCollection)
  const books = await getDocs(
    query(ref, where('userId', '==', id), orderBy('created', 'desc'))
  ).then(querySnapshot => {
    const newData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      docId:doc.id
    }))
    return newData
  })

  return books
}