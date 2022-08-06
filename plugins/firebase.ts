import { defineNuxtPlugin } from '#app'
import { initializeApp } from 'firebase/app'
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC48UAxWSm0xfA5eXpU3SIgBsp_udohSF0',
    authDomain: 'takuma-ru-diary.firebaseapp.com',
    projectId: 'takuma-ru-diary',
    storageBucket: 'takuma-ru-diary.appspot.com',
    messagingSenderId: '851537247753',
    appId: '1:851537247753:web:d64b553588b935795ec2d8',
    measurementId: 'G-9QP3347H9D'
  }

  const app = initializeApp(firebaseConfig)
  const firestore = getFirestore(app)

  enableIndexedDbPersistence(firestore)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistencey
        // ...
      }
    })
})
