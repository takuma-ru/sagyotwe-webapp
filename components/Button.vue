<template>
  <button
    id="Button"
    :disabled="disabled"
    :style="{
      backgroundColor: ''
    }"
    :size="size"
    :fab="fab"
    :icon="iconMode"
    @click="click()"
  >
    <div class="text">
      <Icon
        v-if="icon"
        :color="dependsLuminanceColor(propsColor)"
        size="24px"
        style="margin-right: 0.4rem"
      >
        {{ icon }}
      </Icon>
      <slot />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useColorStore } from '~~/store/color'
import { dependsLuminanceColor } from '~/composables/utils/dependsLuminanceColor'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: '#5498ff'
  },
  size: {
    type: String as PropType<'small' | 'normal' | 'large'>,
    default: 'normal'
  },
  fab: {
    type: Boolean,
    default: false
  },
  iconMode: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: null
  }
})

const emits = defineEmits<{(e: 'click'): void}>()

/* -- store -- */
const {
  getColor
} = useColorStore()

/* -- state -- */

/* -- variable(ref, reactive, computed) -- */
const propsColor = ref(props.color)

/* -- function -- */
const click = () => {
  emits('click')
}

/* -- watch -- */
/* -- life cycle -- */

</script>

<style lang="scss" scoped>
#Button {
  position: relative;
  width: auto;
  height: 100%;

  border: none;
  border-radius: 8px;
  background-color: v-bind(propsColor);
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);

  .text {
    display: inline-flex;
    position: relative;
    z-index: 1;
    height: 24px;
    margin: 0rem 1rem;

    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: v-bind(dependsLuminanceColor(propsColor));

    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }

  &:hover::before {
    position: absolute;
    z-index: 2;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC2D;
  }

  &:disabled {
    color: rgba(16, 16, 16, 0.5);
    cursor: not-allowed;

    .text {
      color: rgba(16, 16, 16, 0.5);
    }

    svg path {
      fill: rgba(16, 16, 16, 0.5);
    }

    &::after {
      position: absolute;
      z-index: 0;
      content: '';
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;

      border-radius: 8px;
      background-color: v-bind(getColor('black', 'lighten', 2));
    }
  }

  &:disabled:hover::before {
    position: absolute;
    z-index: 1;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC00;
  }

  &[fab] {
    .text {
      height: calc(100% - 16px);
      padding: 8px;
    }
  }

  &[icon] {
    .text {
      height: calc(100% - 16px);
      padding: 0px;
    }
  }

  &[size = "small"] {
    width: auto;
    height: 24px;
  }

  &[size = "normal"] {
    width: auto;
    height: 40px;
  }

  &[size = "large"] {
    width: auto;
    height: 64px;
    border-radius: 16px;

    &:hover::before {
      border-radius: 16px;
    }
  }
}
</style>
