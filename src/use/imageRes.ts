export function useGetImageUrl(name: string): string {
  return import.meta.env.VITE_RESOURCE_URL + '/image/' + name
}

export function useGetNextImageIndex(currentIndex: number, len: number) {
  let index = Math.floor(Math.random() * len)
  while (currentIndex == index && len > 1) {
    index = Math.floor(Math.random() * len)
  }
  return index
}
