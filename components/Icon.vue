<template>
  <span class="material-symbols-rounded">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { useColorStore } from '../store/color'

/* -- type, interface -- */
export interface IProps {
  size?: string
  color?: string
  fill?: boolean
  wght?: number
  grad?: number
  opsz?: number

}
/* -- props, emit -- */
/* -- store -- */
const {
  color
} = useColorStore()

/* -- variable(ref, reactive, computed) -- */
/* -- function -- */
/* -- watch -- */
/* -- life cycle -- */

const props = withDefaults(defineProps<IProps>(), {
  size: '24px',
  color: null,
  fill: false,
  wght: 400,
  grad: 0,
  opsz: 48
})

</script>

<style lang="scss" scoped>
.material-symbols-rounded {
  font-variation-settings: 'FILL' v-bind('props.fill ? 1 : 0'), 'wght' v-bind('props.wght'), 'GRAD' v-bind('props.grad'), 'opsz' v-bind('props.opsz');
  font-size: v-bind('props.size');
  color: v-bind('props.color ? props.color : color.theme.text');
  user-select: none;
}
</style>
