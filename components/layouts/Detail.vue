<template>
  <transition name="detail-transition" appear>
    <div
      v-if="docId && !isMobile()"
      id="detail"
    >
      <h2>
        <Icon
          :wght="600"
          :color="color.theme.subText"
          :style="{
            marginRight: '0.5em'
          }"
        >
          event
        </Icon>
        {{ docDate }}
      </h2>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useColorModeStore } from '~~/store/colorModeStore'
import { useColorStore } from '~~/store/colorStore'
import { useDeviceStatusStore } from '~~/store/deviceStatusStore'

const route = useRoute()

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
const docDate = computed(() => {
  return `${props.docId.substring(1, 5)} / ${props.docId.substring(6, 8)} / ${props.docId.substring(9, 11)}`
})

/* -- function -- */
/* -- watch -- */
/* -- life cycle -- */
</script>

<style lang="scss" scoped>
#detail {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  justify-items: start;
  align-items: flex-start;

  margin: 1em;
  padding: 2em;

  border-radius: 0.8em;
  background-color: v-bind('colorMode === "dark" ? color.black.darken[1] : color.white.default');

  .buttons {
    display: flex;
    align-items: center;

    margin-right: 2em;
  }
}

.detail-transition {
  &-enter {
    position: absolute;

    &-from {
      transform: translateX(50vw);
    }
    &-active {
      transition: all 0.4s cubic-bezier(.25,.8,.25,1);
    }
    &-to {
      transform: translateX(0px);
    }
  }

  &-leave {
    &-from {
      transform: translateX(0vw);
    }
    &-active {
      transition: all 0.2s cubic-bezier(.25,.8,.25,1);
    }
    &-to {
      transform: translateX(50vw);
    }
  }
}
</style>
