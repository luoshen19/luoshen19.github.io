<script setup lang="ts">
import MIllustration from '@/components/MIllustration.vue'
import MController from '@/components/MController.vue'
</script>

<template>
  <div class="m-index">
    <MIllustration />
    <MController class="main-bottom" />
  </div>
</template>

<style scoped>
.m-index {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-bottom {
  width: 80%;
}
</style>
