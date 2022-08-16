<template>
  <div id="index">
    <div class="list">
      <h2>
        <Icon
          :wght="700"
          :color="color.theme.subText"
        >
          calendar_view_day
        </Icon>
        &nbsp;直近の日記
      </h2>
      <div class="contents">
        <DiarysDiaryCard
          v-for="docId in weekDocIds"
          :key="docId"
          :doc-id="docId"
          :query-doc-id="queryDocId"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDiaryDataStore } from '~/store/diaryDataStore'
import { useColorStore } from '~~/store/colorStore'
import { useDeviceStatusStore } from '~~/store/deviceStatusStore'

useMeta({
  title: 'Home｜さぎょツイ'
})

const route = useRoute()

/* -- type, interface -- */
/* -- props, emit -- */
/* -- store -- */
useDiaryDataStore()

const {
  isMobileMixin
} = useDeviceStatusStore()

const {
  color
} = useColorStore()

/* -- variable(ref, reactive, computed) -- */

const weekDocIds = computed(() => {
  const array: Array<string> = []
  for (let transitTime = -2; transitTime < 3; transitTime++) {
    const date = new Date()
    date.setDate(date.getDate() + transitTime)
    array.push(`y${date.getFullYear()}m${('0' + (date.getMonth() + 1)).slice(-2).toString()}d${('0' + date.getDate()).slice(-2)}`)
  }

  return array
})

const queryDocId = computed(() => {
  return route.query.docId as string
})

/* -- function -- */

/* -- watch -- */
/* -- life cycle -- */
</script>

<style lang="scss" scoped>
#index {
  display: grid;
  justify-items: v-bind('isMobileMixin("center", "start")');
  align-items: center;

  width: 100%;
  height: 100%;
  overflow-y: auto;

  .buttons {

  }

  .list {
    display: flex;
    flex-flow: column;
    justify-items: start;
    align-items: flex-start;

    width: min(calc(100% - 32px - 4px), calc(400px - 32px - 4px));
    height: 100%;

    h2 {
      z-index: 2;
      position: absolute;

      background: -moz-linear-gradient(top, v-bind('color.theme.background'), #ffffff00);
      background: -webkit-linear-gradient(top, v-bind('color.theme.background'), #ffffff00);
      background: linear-gradient(to bottom, v-bind('color.theme.background'), #ffffff00);
    }

    .contents {
      z-index: 1;
      width: 100%;

      margin-top: calc(35px + 1em);
    }
  }
}
</style>
