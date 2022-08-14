<template>
  <div id="app">
    <Meta :theme-color="color.theme.background" />
    <AppBar />
    <NavBar />
    <div id="contents">
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { registerSW } from 'virtual:pwa-register'
import { useColorStore } from './store/color'
import { useDarkModeStore } from './store/darkMode'
import { useUserProfileStore } from './store/userProfileStore'
import { useDiaryDataStore } from './store/diaryDataStore'
import AppBar from './components/layouts/AppBar.vue'
import NavBar from './components/layouts/NavBar.vue'

registerSW()

/* -- type, interface -- */
/* -- props, emit -- */
/* -- store -- */
/* -- variable(ref, reactive, computed) -- */
/* -- function -- */
/* -- watch -- */
/* -- life cycle -- */

/* -- store -- */
const {
  color
} = useColorStore()

const {
  setSytemMode
} = useDarkModeStore()

useDiaryDataStore()
useUserProfileStore()
setSytemMode()

</script>

<style lang="scss">
#app {
  display: grid;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 64px 1fr;

  width: 100vw;
  height: 100vh;

  overflow: auto;
  background-color: v-bind('color.theme.background');
  color: v-bind('color.theme.text');

  #app-bar {
    grid-row: 1;
    grid-column: 2;
  }

  #nav-bar {
    grid-row: 1/3;
    grid-column: 1;
  }

  #contents {
    grid-row: 2;
    grid-column: 2;

    margin: 16px;
  }
}

html {
  font-family: 'Noto Sans JP', sans-serif;
}

body {
  margin: 0px;
}

h1, h2, h3, h4, h5 {
  margin: 0px;
}

.sub-text {
  color: v-bind('color.theme.subText');
}
</style>
