<script setup lang="ts">
import ZIllustration from '@/components/ZIllustration.vue'
import ZController from '@/components/ZController.vue'
import MController from '@/components/MController.vue'
import ZCatalog from '@/components/ZCatalog.vue'
import ZProgressBar from '@/components/ZProgressBar.vue'

import { inject, watch } from 'vue'
import { useAudioMetaStore } from '@/stores/audio'
import { useConfigStore } from '@/stores/config'
import { audioKey } from '@/util/keys.js'

const audioRef = inject(audioKey)!

const audioMeta = useAudioMetaStore()
const config = useConfigStore()

watch(
  () => audioMeta.sliderPos,
  (sliderPos) => {
    console.log(sliderPos)
    audioRef.value!.currentTime = parseFloat((audioRef.value!.duration * sliderPos).toFixed(2))
    audioMeta.currentTime = audioRef.value!.duration * sliderPos
  }
)
</script>

<template>
  <div class="main-1" :class="{ 'main-1-moible': config.isMoible }">
    <ZIllustration />
    <div class="main-bottom-moible" v-if="config.isMoible">
      <MController />
    </div>
    <div class="main-bottom" v-else>
      <ZProgressBar />
    </div>
  </div>

  <div class="main-2" v-show="!config.isMoible"></div>

  <div class="main-3" v-show="!config.isMoible">
    <ZCatalog />
    <ZController class="main-bottom" />
  </div>

  <div class="main-4" v-show="!config.isMoible"></div>
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
