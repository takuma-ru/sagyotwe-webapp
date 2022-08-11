<template>
  <div id="app">
    <AppBar />
    <div id="contents">
      {{ diaryData }}
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorStore } from './store/color'
import { useDarkModeStore } from './store/darkMode'
import { useUserProfileStore } from './store/userProfileStore'
import { useDiaryDataStore } from './store/diaryDataStore'
import AppBar from './components/layouts/AppBar.vue'

/* -- store -- */
/* -- state -- */
/* -- variable(ref, reactive, computed) -- */
/* -- function -- */
/* -- watch -- */
/* -- life cycle -- */

/* -- store -- */
const {
  getColor
} = useColorStore()

const {
  setSytemMode
} = useDarkModeStore()

const {
  diaryData
} = useDiaryDataStore()

const {
  userProfile
} = useUserProfileStore()
setSytemMode()
</script>

<style lang="scss" scoped>
#app {
  display: grid;
  grid-template-rows: 64px 1fr;

  width: 100vw;
  height: 100vh;

  background-color: v-bind(getColor('theme', 'background'));
  color: v-bind(getColor('theme', 'text'));

  #contents {
    margin: 16px;
  }
}
</style>

<style lang="scss">
body {
  margin: 0px;
}
</style>
