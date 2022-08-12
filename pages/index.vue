import { useDiaryDataStore } from '~~/store/diaryDataStore';
<template>
  <div id="index">
    <div class="buttons">
      <Button icon="code">test</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDiaryDataStore } from '~/store/diaryDataStore'
useMeta({ title: 'Home｜さぎょツイ' })

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
#index {
  display: grid;
  grid-template-rows: 64px 1fr;
  justify-items: center;
  align-items: center;

  width: 100%;
  height: 100%;
}
</style>
