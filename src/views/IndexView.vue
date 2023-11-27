<script setup lang="ts">
import ZIllustration from '@/components/ZIllustration.vue'
import ZController from '@/components/ZController.vue'
import MController from '@/components/MController.vue'
import ZCatalog from '@/components/ZCatalog.vue'
import ZProgressBar from '@/components/ZProgressBar.vue'

import { keyLargeScreen } from "@/util/keys";

import { inject } from "vue";

const largeScreen = inject(keyLargeScreen)
</script>

<template>
  <div class="main-1" :class="{ 'main-1-moible': !largeScreen }">
    <ZIllustration />
    <div class="main-bottom" v-if="largeScreen">
      <ZProgressBar />
    </div>
    <div class="main-bottom-moible" v-else>
      <MController />
    </div>

  </div>

  <div class="main-2" v-show="largeScreen"></div>

  <div class="main-3" v-show="largeScreen">
    <ZCatalog />
    <ZController class="main-bottom" />
  </div>

  <div class="main-4" v-show="largeScreen"></div>
</template>

<style scoped>
/* ================main布局============== */
.main-1 {
  position: relative;
}

.main-1-moible {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.main-bottom-moible {
  width: 80%;
}
</style>
