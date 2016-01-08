import {randomMore, randomWhole, isNegative} from './random'

export default () => {
  let limitations = [randomMore(2), randomMore(2), randomMore(0, 3)]
  return {
    func: {
      z: [randomMore(0, 4), randomMore(0, 4)],
      type: isNegative() ? 'min' : 'max'
    },
    constraints: {
      b: limitations,
      a: limitations.map((item, index) => {
        let first = randomWhole(item) * (index == 2 ? -1 : 1)
        return [first, randomWhole(item, 10, first == 0)]
      }),
      type: limitations.map(item => '<=')
    }
  }
}
