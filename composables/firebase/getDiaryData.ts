import {
  collection,
  getFirestore,
  onSnapshot,
  query
} from 'firebase/firestore'
import { useUserProfileStore } from '~~/store/userProfileStore'

export const getDiaryData = () => {
  const firestore = getFirestore()
  const {
    userProfile
  } = useUserProfileStore()

  if (userProfile.value.uid != null) {
    const q = query(collection(firestore, 'data', userProfile.value.uid, 'pages'))

    onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change)
        /* if (change.type === 'added') {
          const taskData = {
            id: change.doc.data().id,
            title: change.doc.data().title,
            text: change.doc.data().text,
            dateStart: (change.doc.data().date_start || change.doc.data().dateStart as Timestamp).toDate(),
            dateEnd: (change.doc.data().date_end || change.doc.data().dateEnd as Timestamp).toDate(),
            group: change.doc.data().group,
            completed: change.doc.data().completed ? (change.doc.data().completed as Timestamp).toDate() : null,
            tag: change.doc.data().tag
          }

          const index = state.userTaskData.findIndex(({ id }) => id === taskData.id)
          if (index === -1) {
            updateUserTaskData(taskData)
          }
        }

        if (change.type === 'modified') {
          const taskData = {
            id: change.doc.data().id,
            title: change.doc.data().title,
            text: change.doc.data().text,
            dateStart: (change.doc.data().date_start || change.doc.data().dateStart as Timestamp).toDate(),
            dateEnd: (change.doc.data().date_end || change.doc.data().dateEnd as Timestamp).toDate(),
            group: change.doc.data().group,
            completed: change.doc.data().completed ? (change.doc.data().completed as Timestamp).toDate() : null,
            tag: change.doc.data().tag,
          }

          deleteUserTaskData(change.doc.data().id)

          const index = state.userTaskData.findIndex(({ id }) => id === taskData.id)
          if (index === -1) {
            updateUserTaskData(taskData)
          }
        }

        if (change.type === 'removed') {
          console.log(change.doc.data().id)
          deleteUserTaskData(change.doc.data().id)
        } */

        const source = snapshot.metadata.fromCache ? '\u001B[31mlocal cache' : '\u001B[34mserver'
        console.log('\u001B[35mTask\u001B[39m data came from ' + source)
      })
    })
  } else {
    console.error('uid not found')
  }
}
