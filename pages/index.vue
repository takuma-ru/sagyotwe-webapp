<template>
  <div id="index">
    <div class="buttons">
      <Button
        icon="code"
        @click="click()"
      >
        code
      </Button>
    </div>
    <div class="contents">
      <DiarysDiaryCard doc-id="y2022m08d04" />
      <DiarysDiaryCard doc-id="y2022m08d05" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDiaryDataStore } from '~/store/diaryDataStore'
import { useDeviceStatusStore } from '~~/store/deviceStatusStore'

useMeta({
  title: 'Home｜さぎょツイ'
})

/* -- type, interface -- */
/* -- props, emit -- */
/* -- store -- */
const {
  diaryData
} = useDiaryDataStore()

const {
  isMobileMixin
} = useDeviceStatusStore()

/* -- variable(ref, reactive, computed) -- */
/* -- function -- */
const click = () => {
  console.log('open')
}

/* -- watch -- */
/* -- life cycle -- */
</script>

<style lang="scss" scoped>
#index {
  display: grid;
  grid-template-rows: 64px 1fr;
  justify-items: center;
  align-items: center;

  width: 100%;
  height: 100%;

  .buttons {

  }

  .contents {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 1fr;
    justify-items: v-bind('isMobileMixin("center", "start")');
    align-items: center;
  }
}
</style>
