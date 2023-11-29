
// TODO 移动到 imageRes.ts & musicRes

export function useGetMusicUrl(name: string): string {
  return import.meta.env.VITE_RESOURCE_URL + '/music/' + name
}

export function useGetImageUrl(name: string): string {
  return import.meta.env.VITE_RESOURCE_URL + '/image/' + name
}
