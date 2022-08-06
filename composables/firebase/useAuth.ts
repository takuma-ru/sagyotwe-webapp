import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
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
export default function auth () {
  const router = useRouter()
  const twitterProvider = new TwitterAuthProvider()
  const auth = getAuth()

  /**
   * 現在ログイン中のユーザー情報
   */
  const nowUser = reactive<userProfileDataInterface>({
    name: undefined,
    email: undefined,
    uid: undefined,
    photoURL: undefined
  })

  /**
   * ログイン状態を識別
   */
  onAuthStateChanged(auth, (user) => {
    if (user) {
      nowUser.name = user.displayName
      nowUser.email = user.email
      nowUser.uid = user.uid
      nowUser.photoURL = user.photoURL
    } else {
      nowUser.name = null
      nowUser.email = null
      nowUser.uid = null
      nowUser.photoURL = null
    }
  })

  /**
   * ログイン処理
   * @param type
   */
  const trySignIn = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, twitterProvider).then((result) => {
          // const credential = GoogleAuthProvider.credentialFromResult(result)
          // const token = credential?.accessToken
          const user = result.user
          nowUser.name = user.displayName
          nowUser.email = user.email
          nowUser.uid = user.uid
          nowUser.photoURL = user.photoURL
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = GoogleAuthProvider.credentialFromError(error)
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
      nowUser.name = null
      nowUser.email = null
      nowUser.uid = null
      nowUser.photoURL = null
      router.go(0)
    }).catch((error) => {
      console.log(error)
    })
  }

  return {
    nowUser: shallowReadonly(nowUser),

    trySignIn,
    trySignOut
  }
}
