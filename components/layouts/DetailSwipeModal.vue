<template>
  <no-ssr>
    <swipe-modal
      v-model="isModalComputed"
      :dark="colorMode === 'dark'"
      contents-height="50vh"
      border-top-radius="0.8em"
      :contents-color="color.white.default"
      :dark-contents-color="color.black.darken[1]"
      @close="closeModal()"
    >
      <div class="contents">
        {{ docId }}
      </div>
    </swipe-modal>
  </no-ssr>
</template>

<script lang="ts" setup>
import { useColorModeStore } from '~~/store/colorModeStore'
import { useColorStore } from '~~/store/colorStore'
import { useDeviceStatusStore } from '~~/store/deviceStatusStore'

/* -- type, interface -- */
interface IProps {
  docId: string
}

/* -- props, emit -- */
const props = defineProps<IProps>()

/* -- store -- */
const {
  color
} = useColorStore()

const {
  colorMode
} = useColorModeStore()

const {
  isMobile
} = useDeviceStatusStore()

/* -- variable(ref, reactive, computed) -- */
const isModal = ref(false)
const isModalComputed = computed({
  get: () => props.docId && isMobile(),
  set: value => (isModal.value = value)
})

/* -- function -- */
const closeModal = () => {
  navigateTo('?')
}

/* -- watch -- */
/* -- life cycle -- */
</script>

<style lang="scss" scoped>
.contents {
  padding: 1em;
}
</style>
