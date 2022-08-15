import { useColorStore } from './colorStore'

type ColorModeType = 'light' | 'dark'

export const useColorModeStore = () => {
  useColorStore()

  /* -- state -- */
  const colorMode = useState<ColorModeType>('colorMode', () => ('dark'))

  /* -- actions -- */
  const setLight = () => {
    colorMode.value = 'light'
  }

  const setDark = () => {
    colorMode.value = 'dark'
  }

  const switchMode = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  const setSytemMode = () => {
    onMounted(() => {
      const windowColorMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (windowColorMode) {
        colorMode.value = 'dark'
        useColorStore().setDarkTheme()
      } else {
        colorMode.value = 'light'
        useColorStore().setLightTheme()
      }
    })
  }

  return {
    colorMode: readonly(colorMode),
    setLight,
    setDark,
    switchMode,
    setSytemMode
  }
}