/**
 * diaryDataStore用インターフェース群
 */

/**
 * 日記の本文
 */
export interface IDiaryContent {
  /**
   * 詳細説明
   *
   * ※ 箇条書きを想定
   */
  details?: Array<string>

  /**
   * 作業のタイトル
   */
  title: string,
}

/**
 * 1日の日記情報
 */
export interface IDate {
  /**
   * 一言コメント
   */
  comment?: string

  /**
   * 日記の本文
   */
  diary: Array<IDiaryContent>

  /**
   * 識別ID
   *
   * ※ 年 + 月 + 日ベースで生成（y2022m01d01）
   */
  id: string

  /**
   * ツイート済みかどうかのフラグ
   */
  isTweeted: boolean
}

/**
 * 一ヶ月分の日記データを格納する為の型
 */
export interface IMonth {
  /**
   * 日単位のデータ
   *
   * ※d○○
   */
  [index: 'd01' | 'd02' | 'd03' | 'd04' | 'd05' | 'd06' | 'd07' | 'd08' | 'd09' | 'd10' | 'd11' | 'd12' | 'd13' | 'd14' | 'd15' | 'd16' | 'd17' | 'd18' | 'd19' | 'd20' | 'd21' | 'd22' | 'd23' | 'd24' | 'd25' | 'd26' | 'd27' | 'd28' | 'd29' | 'd30' | 'd31']: IDate
}

/**
 * 一年分の日記データを格納する為の型
 */
export interface IYear {
  /**
   * 月単位のデータ
   *
   * ※ m○○
   */
  [index: 'm01' | 'm02' | 'm03' | 'm04' | 'm05' | 'm06' | 'm07' | 'm08' | 'm09' | 'm10' | 'm11' | 'm12']: IMonth
}

/**
 * 日記データストアに代入される型
 */
export interface IDiaryData {
  /**
   * 年単位のデータ
   *
   * ※ y○○○○
   */
  [index: 'y2022' | 'y2023' | 'y2024' | 'y2025']: IYear
}
