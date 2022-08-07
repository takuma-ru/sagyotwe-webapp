<template>
  <button @click="auth.trySignIn()">
    sign in twitter
  </button>
</template>

<script lang="ts" setup>
import useAuth from '~~/composables/firebase/auth'
import { useUserProfileStore } from '~~/store/userProfileStore.js'

useUserProfileStore()

const auth = useAuth()

</script>
