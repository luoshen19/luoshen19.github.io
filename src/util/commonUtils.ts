export class CommonUtils {

  // 秒转时间格式字符串
  static toFormatTime(num: number): string {
    const origNum = Math.round(num)
    const minute = Math.floor(origNum / 60)
    const second = origNum % 60
    return `${minute}:${second.toString().padStart(2, '0')}`
  }
  
  // 转为 xx.xx%
  static toPercentage(n1: number, n2: number): string {
    return ((n1 / n2) * 100).toFixed(2) + '%'
  }
}
