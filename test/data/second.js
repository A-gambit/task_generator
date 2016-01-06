export const constSecondSystem = {
  func: {
    z: [3, 5],
    type: 'max'
  },
  constraints: {
    b: [6, 11, 18],
    a: [[-2, 3], [1, 2], [3, 1]],
    type: ['<=', '<=', '<=']
  }
}

export const constSecondAnswer = {
  x: [5, 3],
  z: 30,
  s: [7, 0, 0]
}