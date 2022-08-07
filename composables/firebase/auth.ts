import {
  getAuth,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  TwitterAuthProvider
} from 'firebase/auth'
import { userProfileDataInterface } from '~/store/userProfileStore'

/**
  Firebase Authentication 関連関数群
  **/
export default function useAuth () {
  const router = useRouter()
  const twitterProvider = new TwitterAuthProvider()
  const auth = getAuth()

  /**
   * 現在ログイン中のユーザー情報
   */
  const loggedInUser = reactive<userProfileDataInterface>({
    name: null,
    email: null,
    uid: null,
    photoURL: null
  })

  /**
   * ログイン状態を識別
   */
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedInUser.name = user.displayName
      loggedInUser.email = user.email
      loggedInUser.uid = user.uid
      loggedInUser.photoURL = user.photoURL
    } else {
      loggedInUser.name = null
      loggedInUser.email = null
      loggedInUser.uid = null
      loggedInUser.photoURL = null
    }
  })

  /**
   * ログイン処理
   */
  const trySignIn = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, twitterProvider).then((result) => {
          // const credential = TwitterAuthProvider.credentialFromResult(result)
          // const token = credential?.accessToken
          const user = result.user
          loggedInUser.name = user.displayName
          loggedInUser.email = user.email
          loggedInUser.uid = user.uid
          loggedInUser.photoURL = user.photoURL
          console.log(loggedInUser)
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = TwitterAuthProvider.credentialFromError(error)
          console.error('error code:', errorCode, 'error message:', errorMessage, 'your email:', email)
          console.error(credential)
        })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message

        console.error('ERROR: firebase/auth \n errorCode', errorCode, '\nerrorMessage', errorMessage)
      })
  }

  /**
   * ログアウト処理
   */
  const trySignOut = () => {
    signOut(auth).then(() => {
      loggedInUser.name = null
      loggedInUser.email = null
      loggedInUser.uid = null
      loggedInUser.photoURL = null
      router.go(0)
    }).catch((error) => {
      console.log(error)
    })
  }

  return {
    loggedInUser: readonly(loggedInUser),

    trySignIn,
    trySignOut
  }
}
