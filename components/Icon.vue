<template>
  <span class="material-symbols-rounded">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { useColorStore } from '../store/color'

const props = defineProps({
  size: {
    type: String,
    default: '24px'
  },
  color: {
    type: String,
    default: null
  }
})

/* -- store -- */
const {
  color
} = useColorStore()

/* -- variable(ref, reactive, computed) -- */

</script>

<style lang="scss" scoped>
.material-symbols-rounded {
  font-size: v-bind('props.size');
  color: v-bind('props.color ? props.color : color.theme.text');
  user-select: none
}
</style>
