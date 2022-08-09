<template>
  <div id="app-bar">
    <div class="title">

    </div>
    <div class="links">

    </div>
    <div class="buttons">
      <ColorModeButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ColorModeButton from '../utils/ColorModeButton.vue'
</script>

<style lang="scss" scoped>
#app-bar {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: end;
  align-items: center;

  .buttons {
    margin-right: 2em;
  }
}
</style>
