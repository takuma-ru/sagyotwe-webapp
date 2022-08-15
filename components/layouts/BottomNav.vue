<template>
  <div
    v-if="isMobile()"
    id="bottom-nav-bar"
  >
    <div
      v-for="link in links"
      :key="link.name"
    >
      <Button
        is-icon
        :icon="link.icon"
        :to="link.path"
        :icon-props="{
          fill: route.fullPath === link.path ? true : false
        }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
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

/* -- variable(ref, reactive, computed) -- */
const route = useRoute()

const links = ref<ILinks[]>([
  {
    name: 'calender',
    icon: 'calendar_month',
    path: '/calendar'
  },
  {
    name: 'top',
    icon: 'home',
    path: '/'
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
#bottom-nav-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100vw;
  height: 64px;
}
</style>
