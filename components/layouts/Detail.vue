<template>
  <transition name="detail-transition" appear>
    <div
      v-if="docId && !isMobile()"
      id="detail"
    >
      <div
        v-if="isData(docId).value[2]"
        class="data"
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
          の作業日記
        </h2>
        <hr>
        <p>
          {{ diaryData[thisYear][thisMonth][thisDay].comment }}
        </p>

        <ul>
          <li
            v-for="diary in diaryData[thisYear][thisMonth][thisDay].diary"
            :key="diary.title"
          >
            {{ diary.title }}
            <ul>
              <li
                v-for="detail in diary.details"
                :key="detail"
              >
                {{ detail }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div
        v-else
        class="empty"
      >
        <h2>
          <Icon
            :wght="600"
            :color="color.theme.subText"
            :style="{
              marginRight: '0.5em'
            }"
          >
            draw
          </Icon>
          {{ docDate }}
          の日記を書く
        </h2>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useColorModeStore } from '~~/store/colorModeStore'
import { useColorStore } from '~~/store/colorStore'
import { useDeviceStatusStore } from '~~/store/deviceStatusStore'
import { useDiaryDataStore } from '~~/store/diaryDataStore'
import { IDate } from '~~/types/store/IDiaryDataStore'

const route = useRoute()

/* -- type, interface -- */
interface IProps {
  docId: string
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

const {
  isMobile
} = useDeviceStatusStore()

/* -- variable(ref, reactive, computed) -- */
const docDate = computed(() => {
  return `${props.docId.substring(1, 5)} / ${props.docId.substring(6, 8)} / ${props.docId.substring(9, 11)}`
})

const thisYear = computed(() => {
  return props.docId.substring(0, 5)
})

const thisMonth = computed(() => {
  return props.docId.substring(5, 8)
})

const thisDay = computed(() => {
  return props.docId.substring(8, 11)
})

/* -- function -- */
/* -- watch -- */
/* -- life cycle -- */
</script>

<style lang="scss" scoped>
#detail {
  margin: 1em;

  hr {
    width: 100%;

    margin: 1em 0em;

    color: v-bind('color.theme.subText');
  }

  ul {
    padding-inline-start: 2em;
  }

  .data {
    display: flex;
    flex-flow: column;
    justify-items: start;
    align-items: flex-start;

    height: calc(100% - 4em);

    padding: 2em;

    border-radius: 0.8em;
    background-color: v-bind('colorMode === "dark" ? color.black.darken[1] : color.white.default');
  }

  .empty {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    justify-items: start;
    align-items: flex-start;

    height: calc(100% - 4em);

    padding: 2em;

    border-radius: 0.8em;
    background-color: v-bind('colorMode === "dark" ? color.black.darken[1] : color.white.default');
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
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }
    &-to {
      transform: translateX(50vw);
    }
  }
}
</style>
