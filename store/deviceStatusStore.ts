
/* -- interface -- */
type TDisplaySize = 'laptop' | 'mobile'

export const useDeviceStatusStore = () => {
  /* -- state -- */
  /**
   * ディスプレイサイズデータストア
   */
  const displaySize = useState<TDisplaySize>('displaySize', () => ('laptop'))

  /* -- getters -- */
  /**
   * モバイル端末かどうかのフラグを返す
   * @returns モバイル端末かどうか
   */
  const isMobile = () => {
    return displaySize.value === 'mobile'
  }

  /* -- mutations -- */
  /**
   * displaySizeStoreの値を変更する
   * @param size 画面の大きさ（'laptop' | 'mobile'）
   */
  const updateDisplaySize = (size: TDisplaySize) => {
    displaySize.value = size
  }

  /* -- actions -- */
  /**
   * 現在の画面の大きさを取得し、displaySizeStoreの値に変更する
   */
  const getThisDisplaySize = () => {
    onMounted(() => {
      // mobileの場合
      if (window.matchMedia('(min-width: 480px)').matches) {
        updateDisplaySize('mobile')
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        updateDisplaySize('laptop')
      }
    })
  }

  return {
    displaySize: readonly(displaySize),
    isMobile,
    updateDisplaySize,
    getThisDisplaySize
  }
}
