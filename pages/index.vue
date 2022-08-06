<template>
  <div>
    index
  </div>
</template>

<script lang="ts" setup>
import { useFirestore } from '../composables/firebase/useFirestore'

const {
  getTestData
} = useFirestore()

onMounted(() => {
  getTestData()
})
</script>
