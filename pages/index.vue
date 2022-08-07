<template>
  <div>
    <SignInButton />
    index
  </div>
</template>

<script lang="ts" setup>
import { useFirestore } from '../composables/firebase/useFirestore'
import SignInButton from '~~/components/utils/SignInButton.vue'

const {
  getTestData
} = useFirestore()

getTestData()
</script>
