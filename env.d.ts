/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_RESOURCE_URL: string
  readonly VITE_MIN_WIDTH: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
