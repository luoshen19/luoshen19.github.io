<script setup lang="ts">
export interface Props {
  /** icon 名称 */
  name: string
  /** icon 的尺寸 */
  size?: string
}

withDefaults(defineProps<Props>(), {
  size: '100%'
})
</script>

<template>
  <svg :style="{ width: size, height: size }" class="svg-icon-wrapper">
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
</template>

<style>
.svg-icon-wrapper {
  display: inline-block;
  color: var(--color-text);
}

.svg-icon-wrapper:hover {
  color: var(--color-heading);
}
</style>
