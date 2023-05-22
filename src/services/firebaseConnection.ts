import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBEhiiLPwXiZEE8Gq_bWGO4EhuB8TwoloA',
  authDomain: 'literando-ecommerce.firebaseapp.com',
  projectId: 'literando-ecommerce',
  storageBucket: 'literando-ecommerce.appspot.com',
  messagingSenderId: '522541875641',
  appId: '1:522541875641:web:89e9be6e70f67e5f69f668',
  measurementId: 'G-BRF6J0T4T4',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
