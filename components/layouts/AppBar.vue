<template>
  <div id="app-bar">
    <div class="title">
      <img src="" alt="">
    </div>
    <div class="links">

    </div>
    <div class="buttons">
      <SignInButton style="margin-right: 1rem" />
      <ColorModeButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ColorModeButton from '../utils/ColorModeButton.vue'
import SignInButton from '../utils/SignInButton.vue'
</script>

<style lang="scss" scoped>
#app-bar {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: end;
  align-items: center;

  .buttons {
    display: flex;
    align-items: center;

    margin-right: 2em;
  }
}
</style>
