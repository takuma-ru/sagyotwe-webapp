<template>
  <span
    class="material-symbols-rounded"
    :style="{
      fontSize: size,
      color: props.color ? props.color : color.theme.text
    }"
  >
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
  color,
  getColor
} = useColorStore()

/* -- variable(ref, reactive, computed) -- */

</script>

<style lang="scss" scoped>
.material-symbols-rounded {
  user-select: none
}
</style>
