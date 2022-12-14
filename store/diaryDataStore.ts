import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'

import {
  IDate,
  IDiaryData
} from 'types/store/IDiaryDataStore'

export const useDiaryDataStore = () => {
  /* -- state -- */
  /**
   * 日記データストア
   */
  const diaryData = useState<IDiaryData>('diaryData', () => ({}))

  /* -- getters -- */
  /**
   * 引数で指定したidのオブジェクトプロパティが日記データストアに存在するかのフラグ配列を返す
   * @param docId id（yXXXXmXXdXX）
   * @returns [yXXXXが存在するか, mXXが存在するか, dXXが存在するか]
   */
  const isData = (docId: string) => computed(() => {
    if (!(docId.substring(0, 5) in diaryData.value)) {
      return [false, false, false]
    } else if (!(docId.substring(5, 8) in diaryData.value[docId.substring(0, 5)])) {
      return [true, false, false]
    } else if (!(docId.substring(8, 11) in diaryData.value[docId.substring(0, 5)][docId.substring(5, 8)])) {
      return [true, true, false]
    } else {
      return [true, true, true]
    }
  })

  /* -- mutation -- */
  const setDiaryData = (data: IDate) => {
    diaryData.value = data
  }

  const addDiaryData = ({ y, m, d, data }: {y: string; m: string, d: string, data: IDate}) => {
    diaryData.value[y][m][d] = data
  }

  const deleteDiaryData = (docId: string) => {
    // y○○○○
    const yearID = docId.substring(0, 5)
    // m○○
    const monthID = docId.substring(5, 8)
    // d○○
    const dayID = docId.substring(8, 11)

    // 日記データストアオブジェクトから削除
    delete diaryData.value[yearID][monthID][dayID]
  }

  const initDiaryData = () => {
    diaryData.value = {}
  }

  /* -- action -- */
  /**
   * Firestoreに保存されている今月の日記データの変更状況を監視し、変更があった場合に日記データストアに反映するAction
   * @param uid ログインしているユーザーのUID
   */
  const getDiaryDataThisYearThisMonth = (uid: string) => {
    const firestore = getFirestore()

    // 現在の年、月を取得
    const thisDate = new Date()
    const thisYearID = 'y' + thisDate.getFullYear().toString()
    const thisMonthID = 'm' + ('0' + (thisDate.getMonth() + 1)).slice(-2).toString()

    if (uid !== null) {
      // 所得するデータのクエリを作成
      const q = query(
        collection(firestore, 'data', uid, 'diaries', thisYearID, thisMonthID),
        orderBy('id', 'desc')
      )

      // firestoreの変更検知（オブザーバー的な振る舞いをする）
      onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data() as IDate

          // 取得データを整形
          const gotDiaryData: IDate = {
            comment: data?.comment,
            diary: data.diary,
            id: data.id,
            isTweeted: data.isTweeted
          }

          // y○○○○
          const yearID = gotDiaryData.id.substring(0, 5)
          // m○○
          const monthID = gotDiaryData.id.substring(5, 8)
          // d○○
          const dayID = gotDiaryData.id.substring(8, 11)

          // 新たな日記データの場合
          if (change.type === 'added') {
            // "年"のオブジェクトが取得できなかった場合、日記データストアにオブジェクトを追加する
            if (!isData(data.id).value[0]) {
              diaryData.value[yearID] = {}
            }

            // "月"のオブジェクトが取得できなかった場合、日記データストアにオブジェクトを追加する
            if (!isData(data.id).value[1]) {
              diaryData.value[yearID][monthID] = {}
            }

            // 日記データを取得できなかった場合、日記データストアにデータを追加する
            if (!isData(data.id).value[2]) {
              addDiaryData({
                y: yearID,
                m: monthID,
                d: dayID,
                data: gotDiaryData
              })
            }
          }

          // 既存の日記データが更新された場合
          if (change.type === 'modified') {
            // 一度既存データ削除
            deleteDiaryData(change.doc.data().id)

            // "年"のオブジェクトが取得できなかった場合、日記データストアにオブジェクトを追加する
            if (!isData(data.id).value[0]) {
              diaryData.value[yearID] = {}
            }

            // "月"のオブジェクトが取得できなかった場合、日記データストアにオブジェクトを追加する
            if (!isData(data.id).value[1]) {
              diaryData.value[yearID][monthID] = {}
            }

            // もう一度追加する処理
            if (!isData(data.id).value[2]) {
              addDiaryData({
                y: yearID,
                m: monthID,
                d: dayID,
                data: gotDiaryData
              })
            }
          }

          // 日記データが削除された場合
          if (change.type === 'removed') {
            // 日記データ削除
            deleteDiaryData(gotDiaryData.id)
          }

          // ローカル or サーバーから取得したデータかどうかをコンソールに表示
          const source = snapshot.metadata.fromCache ? '\u001B[31mlocal cache' : '\u001B[34mserver'
          console.log('\u001B[32mDiary\u001B[39m data came from ' + source)
        })
      })
    } else {
      console.error('uid not found')
    }
  }

  return {
    diaryData: readonly(diaryData),

    isData,

    setDiaryData,
    addDiaryData,
    deleteDiaryData,
    initDiaryData,

    getDiaryDataThisYearThisMonth
  }
}
