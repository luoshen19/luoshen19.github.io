import type { Ref } from 'vue'

export class AudioUtils {
  // 秒转时间格式字符串
  static test(audioRef: Ref<HTMLAudioElement | undefined>) {
    if (audioRef.value!.paused) {
      audioRef.value!.play()
    } else {
      audioRef.value!.pause()
    }
    // audioMeta.paused = !audioMeta.paused
  }
}
