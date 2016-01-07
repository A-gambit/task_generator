import {randomNotNull, randomWhole, isNegative} from './random'

export default () => {
  let isFirst = isNegative()
  let isSecond = !isFirst && isNegative()
  let limitations = [randomNotNull(), randomNotNull(), randomNotNull()]
  return {
    func: {
      z: [randomNotNull(4), randomNotNull(4)],
      type: isNegative() ? 'min' : 'max'
    },
    constraints: {
      b: limitations,
      a: limitations.map((item, index) => {
        let first = randomWhole(item)  * ((index == 0 && isFirst) || (index == 1 && isSecond) ? -1 : 1)
        return [first, randomWhole(item, 10, first == 0)]
      }),
      type: limitations.map(item => '<=')
    }
  }
}
