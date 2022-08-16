<template>
  <div id="diary-card">
    <h3>
      <Icon
        :wght="600"
        :color="color.theme.subText"
        :style="{
          marginRight: '0.2em'
        }"
      >
        event
      </Icon>
      {{ docDate }}
    </h3>
    <span class="sub-text status">
      {{ !!isData(docId).value[2] ? '記録済み！' : '未記録' }}
    </span>
    <div class="buttons">
      <Button
        v-if="queryDocId === docId"
        icon="close"
        :color="color.red.lighten[1]"
        @click="closeDetail()"
      >
        閉じる
      </Button>
      <Button
        v-else-if="!!isData(docId).value[2]"
        icon="read_more"
        @click="openDetail()"
      >
        詳細を見る
      </Button>
      <Button
        v-else
        icon="draw"
        :color="color.yellow.default"
        @click="openDetail()"
      >
        日記を書く
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDiaryDataStore } from '~/store/diaryDataStore'
import { useColorStore } from '~~/store/colorStore'
import { useColorModeStore } from '~~/store/colorModeStore'

/* -- type, interface -- */
interface IProps {
  docId: string
  queryDocId: string
}
/* -- props, emit -- */
const props = defineProps<IProps>()

/* -- store -- */
const {
  diaryData,
  isData
} = useDiaryDataStore()
const {
  color
} = useColorStore()

const {
  colorMode
} = useColorModeStore()

/* -- variable(ref, reactive, computed) -- */
const docDate = computed(() => {
  return `${props.docId.substring(1, 5)} / ${props.docId.substring(6, 8)} / ${props.docId.substring(9, 11)}`
})

/* -- function -- */
const openDetail = () => {
  navigateTo(`?docId=${props.docId}`)
}

const closeDetail = () => {
  navigateTo('?')
}

/* -- watch -- */
/* -- life cycle -- */
</script>

<style lang="scss" scoped>
#diary-card {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  justify-content: start;
  align-items: center;

  width: min(calc(100% - 32px - 4px), calc(400px - 32px - 4px));

  padding: 16px;
  margin-bottom: 1em;

  background-color: v-bind('colorMode === "dark" ? color.black.darken[1] : color.white.default');
  border-radius: 0.8em;

  h3 {
    display: inline-flex;
    align-items: center;
  }

  .status {
    color: v-bind('!!isData(docId).value[2] ? color.blue.default : color.yellow.default');
  }

  .buttons {
    grid-column: 1/3;

    display: flex;
    justify-content: end;

    margin-top: 1em;
  }
}
</style>
