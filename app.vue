<template>
  <div id="app">
    <Meta name="theme-color" :content="color.theme.background" />
    <AppBar />
    <NavBar />
    <BottomNav />
    <div id="contents">
      <NuxtPage />
    </div>
    <Detail :doc-id="queryDocId" />
    <DetailSwipeModal :doc-id="queryDocId" />
  </div>
</template>

<script lang="ts" setup>
import { registerSW } from 'virtual:pwa-register'
import { useColorStore } from './store/colorStore'
import { useColorModeStore } from './store/colorModeStore'
import { useUserProfileStore } from './store/userProfileStore'
import { useDiaryDataStore } from './store/diaryDataStore'
import { useDeviceStatusStore } from './store/deviceStatusStore'
import AppBar from './components/layouts/AppBar.vue'
import NavBar from './components/layouts/NavBar.vue'
import BottomNav from './components/layouts/BottomNav.vue'
import Detail from './components/layouts/Detail.vue'
import DetailSwipeModal from './components/layouts/DetailSwipeModal.vue'

registerSW()

/* -- type, interface -- */
/* -- props, emit -- */
/* -- store -- */
/* -- variable(ref, reactive, computed) -- */
/* -- function -- */
/* -- watch -- */
/* -- life cycle -- */

/* -- props, emit -- */
const route = useRoute()

/* -- store -- */
const {
  color
} = useColorStore()

const {
  setSytemMode
} = useColorModeStore()

const {
  getThisDisplaySize,
  isMobileMixin,
  isMobile
} = useDeviceStatusStore()

useDiaryDataStore()
useUserProfileStore()
setSytemMode()

getThisDisplaySize()

/* -- variable(ref, reactive, computed) -- */
const queryDocId = computed(() => {
  return route.query.docId as string
})

/* -- function -- */

</script>

<style lang="scss">
/*
  z-index rule ;

  50 ~ 100 : Impossible field(干渉不可能領域) => 表示優先度が高いもの。隠れてはいけない要素を置く

  0 ~ 40 : variable field => 隠れてもいい要素など。
*/

#app {
  display: grid;
  grid-template-rows: v-bind('isMobileMixin("64px calc(100vh - 64px - 56px) 56px", "64px 1fr")');
  grid-template-columns: v-bind('isMobileMixin("0px 1fr", "64px 1fr 1fr")');

  width: 100vw;
  height: 100vh;

  background-color: v-bind('color.theme.background');
  color: v-bind('color.theme.text');
  overflow-y: auto;
  overflow-x: hidden;

  #app-bar {
    grid-row: 1;
    grid-column: 2/4;
  }

  #nav-bar {
    grid-row: 1/3;
    grid-column: 1;
  }

  #bottom-nav-bar {
    grid-row: 3;
    grid-column: 1;
  }

  #contents {
    grid-row: 2;
    grid-column: v-bind('queryDocId && !isMobile() ? "2" : "2/4"');

    margin: 16px;
  }

  #detail {
    grid-row: 2;
    grid-column: 3;
  }
}

html {
  font-family: 'Noto Sans JP', sans-serif;
}

body {
  margin: 0px;

  background-color: v-bind('color.theme.background');
  overscroll-behavior-y: none;
}

h1, h2, h3, h4, h5 {
  display: inline-flex;
  align-items: center;
  margin: 0px;
}

p {
  margin-top: 0px;
  margin-bottom: 1em;
}

.sub-text {
  color: v-bind('color.theme.subText');
}
</style>
