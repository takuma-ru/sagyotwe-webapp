<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useColorStore } from './store/color'
import { useUserProfileStore } from './store/userProfileStore'

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

useUserProfileStore()
</script>

<style lang="scss">
#app {
  background-color: v-bind(getColor('theme', 'background'));
  color: v-bind(getColor('theme', 'text'));
  height: 100vh;
  width: 100vw;
}

body {
  margin: 0px;
}
</style>
