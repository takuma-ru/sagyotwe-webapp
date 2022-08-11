<template>
  <div id="signin">
    <div class="logo">
      <img src="../assets/icon_only.png" height="64" alt="">
    </div>
    <div class="contents">
      <p>- はじめる -</p>
      <SignInButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SignInButton from '~~/components/utils/SignInButton.vue'

useMeta({ title: 'サインイン｜さぎょツイ' })
</script>

<style lang="scss" scoped>
#signin {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;

  width: 100%;
  height: 100%;

  .logo {
  }

  .contents {

  }
}
</style>
