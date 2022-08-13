<template>
  <div id="setting">
  </div>
</template>

<script lang="ts" setup>
import { useDiaryDataStore } from '~/store/diaryDataStore'
useMeta({ title: 'Setting｜さぎょツイ' })

/* -- type, interface -- */
/* -- props, emit -- */
/* -- store -- */
const {
  diaryData
} = useDiaryDataStore()

/* -- variable(ref, reactive, computed) -- */
/* -- function -- */

/* -- watch -- */
/* -- life cycle -- */
</script>

<style lang="scss" scoped>
#setting {
  display: grid;
  grid-template-rows: 64px 1fr;
  justify-items: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
</style>
