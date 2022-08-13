<template>
  <div id="diary-card">
    <div class="card">
      <h3>
        {{ formatDate(today) }}
      </h3>
    </div>
    <div class="detail" />
  </div>
</template>

<script lang="ts" setup>
import { useDiaryDataStore } from '~/store/diaryDataStore'
import { useColorStore } from '~~/store/color'

/* -- type, interface -- */
/* -- props, emit -- */
/* -- store -- */
const {
  diaryData
} = useDiaryDataStore()
const {
  color
} = useColorStore()

/* -- variable(ref, reactive, computed) -- */
const today = new Date()

const formatDate = (date) => {
  const formattedDate = date.getFullYear() + ' / ' + ('0' + (today.getMonth() + 1)).slice(-2) + ' / ' + ('0' + today.getDate()).slice(-2)
  return formattedDate
}

const todayID = ref([
  `y${today.getFullYear().toString()}`,
  `m${('0' + (today.getMonth() + 1)).slice(-2).toString()}`,
  `d${('0' + today.getDate()).slice(-2).toString()}`
])
/* -- function -- */

/* -- watch -- */
/* -- life cycle -- */
</script>

<style lang="scss" scoped>
#diary-card {
  .card {
    display: grid;
    justify-content: start;
    align-items: center;

    width: 300px;

    padding: 16px;

    background-color: v-bind('color.theme.complementaryDarken[1]');
    border-radius: 0.8rem;
    border: 2px solid v-bind('color.theme.complementaryDarken[2]');
  }
}
</style>
