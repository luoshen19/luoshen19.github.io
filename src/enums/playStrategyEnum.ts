export enum PlayStrategyEnum {
  // 顺序循环
  REPEAT = 'REPEAT',
  // 单曲循环
  REPEAT_ONE = 'REPEAT_ONE',
  // 随机
  SHUFFLE = 'SHUFFLE',
  // 默认
  DEFAULT = SHUFFLE
}

export function str2PlayStrategyEnum(str: string): PlayStrategyEnum {
  // TODO 异常返回一个默认值
  return Object.values(PlayStrategyEnum).find((value) => value === str) as PlayStrategyEnum
}

export function getNextPlayStrategyEnum(currentValue: PlayStrategyEnum): PlayStrategyEnum {
  const enumValues = Object.values(PlayStrategyEnum)
  const currentIndex = enumValues.indexOf(currentValue)
  return enumValues[(currentIndex + 1) % enumValues.length]
}
