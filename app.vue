<template>
  <div>
    <NuxtPage />
    {{ userProfile }}
  </div>
</template>

<script lang="ts" setup>
import { useUserProfileStore } from './store/userProfileStore.js'

const {
  userProfile
} = useUserProfileStore()

</script>
