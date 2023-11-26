<script setup lang="ts">
import { ref } from 'vue'

export interface Props {
  /** icon 名称 */
  name: string
  /** icon 的尺寸 */
  size?: string
  /** icon 的颜色 */
  color?: string
  /** icon 的hover颜色 */
  hoverColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '100%',
  color: 'var(--color-text)',
  hoverColor: 'var(--color-heading)'
})

const svgColor = ref(props.color)

function handleMouseOver() {
  svgColor.value = props.hoverColor
}

function handleMouseOut() {
  svgColor.value = props.color
}
</script>

<template>
  <svg
    :style="{ width: size, height: size, color: svgColor, fill: svgColor }"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
</template>

<style scoped></style>
