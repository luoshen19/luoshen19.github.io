<script setup lang="ts">
import ZIllustration from '@/components/ZIllustration.vue'
import ZController from '@/components/ZController.vue'
import ZCatalog from '@/components/ZCatalog.vue'
import ZProgressBar from '@/components/ZProgressBar.vue'
</script>

<template>
  <div class="main-1">
    <ZIllustration />
    <ZProgressBar class="main-bottom" />
  </div>

  <div class="main-2"></div>

  <div class="main-3">
    <ZCatalog />
    <ZController class="main-bottom" />
  </div>

  <div class="main-4"></div>
</template>

<style scoped>
/* ================main布局============== */
.main-1 {
  position: relative;
}

.main-2 {
  flex: 1;
}

.main-3 {
  width: 50vh;
  position: relative;
}

.main-4 {
  flex: 2;
}
/* ================main布局============== */

.main-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
