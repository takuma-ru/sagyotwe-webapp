<template>
  <div id="diary-card">
    <h3>
      {{ docDate }}
    </h3>
    <Button
      is-icon
      icon="chevron_right"
    />
    <div class="buttons">
      <span class="sub-text">{{ diaryData[props.docId.substring(0, 5)][props.docId.substring(5, 8)][props.docId.substring(8, 11)] !== undefined ? '既に書いています' : 'まだ書いていません' }}</span>
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
}
/* -- props, emit -- */
const props = defineProps<IProps>()

/* -- store -- */
const {
  diaryData
} = useDiaryDataStore()
const {
  color
} = useColorStore()

const {
  colorMode
} = useColorModeStore()

/* -- variable(ref, reactive, computed) -- */
const today = new Date()

/* const isEmptyData = computed(() => {
  return diaryData[props.docId.substring(0, 5)][props.docId.substring(5, 8)][props.docId.substring(8, 11)] !== undefined
}) */

const docDate = computed(() => {
  return `${props.docId.substring(1, 5)} / ${props.docId.substring(6, 8)} / ${props.docId.substring(9, 11)}`
})

/* -- function -- */

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

  background-color: v-bind('colorMode === "dark" ? color.black.darken[1] : color.white.default');
  border-radius: 0.8rem;

  .buttons {
    
  }
}
</style>
