<template>
  <div id="app">
    <AppBar />
    <div id="contents">
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

useDiaryDataStore()
useUserProfileStore()
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
