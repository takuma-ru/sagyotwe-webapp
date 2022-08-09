<template>
  <div id="index">
    <p>- はじめる -</p>
    <SignInButton />
  </div>
</template>

<script lang="ts" setup>
import { useFirestore } from '../composables/firebase/useFirestore'
import SignInButton from '~~/components/utils/SignInButton.vue'

useMeta({ title: 'Home｜さぎょツイ' })

const {
  getTestData
} = useFirestore()

getTestData()
</script>

<style lang="scss" scoped>
#index {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
</style>
