/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_RESOURCE_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
