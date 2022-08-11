import { useDiaryDataStore } from './diaryDataStore'
import { useAuth } from '~~/composables/firebase/auth'

/**
  現在ログイン中のユーザープロファイルデータストア
**/
export interface userProfileDataInterface {
  name: string | null,
  email: string | null,
  uid: string | null,
  photoURL: string | null,
}

export const useUserProfileStore = () => {
  const diaryDataStore = useDiaryDataStore()

  /* -- state -- */
  /**
  * ユーザープロファイルデータストア
  */
  const userProfile = useState<userProfileDataInterface>('userProfile', () => ({
    name: null,
    email: null,
    uid: null,
    photoURL: null
  }))

  const isGettingProfileData = useState('isGettingProfileData', () => (true))

  /* -- mutations -- */
  /**
   * userProfileのデータを保存する
   * @param newVal \{ name, email, uid, photoURL }
   * @returns void
   */
  const updateUserProfile = ({ name, email, uid, photoURL }: { name: string, email: string, uid: string, photoURL: string }) => {
    const newVal = {
      name,
      email,
      uid,
      photoURL
    }
    userProfile.value = newVal
  }

  /**
   * userProfileを初期化する
   * @returns void
   */
  const initUserProfile = () => {
    userProfile.value = {
      name: null,
      email: null,
      uid: null,
      photoURL: null
    }
  }

  /**
   * プロファイルデータ取得中のフラグを更新する
   * @param flag フラグ値
   */
  const updateIsGettingProfileData = (flag: boolean) => {
    isGettingProfileData.value = flag
  }

  /* -- action -- */

  /* -- watch -- */
  // auth.tsからログイン状態を取得し、userProfileに代入
  const { loggedInUser } = useAuth()
  watch(loggedInUser, (newLoggedInUser) => {
    console.log(newLoggedInUser)
    if (newLoggedInUser.uid === undefined) {
      isGettingProfileData.value = true
    } else {
      isGettingProfileData.value = false
      if (newLoggedInUser.uid !== null) {
        diaryDataStore.getDiaryDataThisYearThisMonth(newLoggedInUser.uid)
      }
    }
    updateUserProfile({
      name: newLoggedInUser.name!,
      email: newLoggedInUser.email!,
      uid: newLoggedInUser.uid!,
      photoURL: newLoggedInUser.photoURL!
    })
  })

  return {
    userProfile: readonly(userProfile),
    isGettingProfileData: readonly(isGettingProfileData),

    updateUserProfile,
    initUserProfile,
    updateIsGettingProfileData
  }
}
