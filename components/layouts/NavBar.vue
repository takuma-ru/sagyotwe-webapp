<template>
  <div
    v-if="!isMobile()"
    id="nav-bar"
  >
    <div />
    <div class="buttons">
      <div
        v-for="link in links"
        :key="link.name"
        :style="{
          marginBottom: '2em'
        }"
      >
        <Button
          is-icon
          :icon="link.icon"
          :to="link.path"
          :icon-props="{
            fill: route.fullPath === link.path ? true : false,
            color: route.fullPath === link.path ? color.theme.text : color.red.default
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorStore } from '~~/store/colorStore'
import { useDeviceStatusStore } from '~~/store/deviceStatusStore'

/* -- type, interface -- */
interface ILinks {
  name: string
  icon: string
  path: string
}
/* -- props, emit -- */
/* -- store -- */
const {
  isMobile
} = useDeviceStatusStore()

const {
  color
} = useColorStore()

/* -- variable(ref, reactive, computed) -- */
const route = useRoute()

const links = ref<ILinks[]>([
  {
    name: 'top',
    icon: 'home',
    path: '/'
  },
  {
    name: 'calender',
    icon: 'calendar_month',
    path: '/calendar'
  },
  {
    name: 'setting',
    icon: 'settings',
    path: '/setting'
  }
])

/* -- function -- */
/* -- watch -- */
/* -- life cycle -- */
</script>

<style lang="scss" scoped>
#nav-bar {
  display: grid;
  grid-template-rows: 64px 1fr;
  justify-content: center;

  width: calc(100% - 16px);
  height: calc(100% - 16px);

  margin: 8px;

  .buttons {
    display: flex;
    flex-flow: column;

    margin-top: 0px;
  }
}
</style>
