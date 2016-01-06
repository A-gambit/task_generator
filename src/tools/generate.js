import {randomNotNull, randomWhole, isNegative} from './random'

export default () => {
  let isFirst = isNegative()
  let isSecond = !isFirst && isNegative()
  let limitations = [randomNotNull(), randomNotNull(), randomNotNull()]
  return {
    func: {
      z: [randomNotNull(), randomNotNull()],
      type: 'max'
    },
    constraints: {
      b: limitations,
      a: limitations.map((item, index) => {
        return [
          (index == 0 && isFirst) || (index == 1 && isSecond) ? -1 * randomWhole(item, 3) : randomWhole(item),
          randomWhole(item)
        ]
      }),
      type: limitations.map(item => '<=')
    }
  }
}
