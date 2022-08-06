import {
  getFirestore,
  doc,
  getDoc
} from 'firebase/firestore'

export const useFirestore = () => {
  const firestore = getFirestore()

  const getTestData = async () => {
    const ref = doc(firestore, 'data', 'tester')
    try {
      const document = await getDoc(ref)
      console.log(document.data())
    } catch (e) {
      alert('Error!')
      console.error(e)
    }
  }
  return {
    getTestData
  }
}
