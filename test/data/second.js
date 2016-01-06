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

export const constSecondSlr = {
  func: {
    w: [6, 11, 18],
    type: 'min'
  },
  constraints: {
    b: [3, 5, 0, 0, 0],
    a: [[-2, 1, 3], [3, 2, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
    type: ['>=', '>=', '>=', '>=', '>=']
  }
}

export const constBasicSecondResource = {
  b: [3, 5, 0],
  a: [[-2, 1, 3], [3, 2, 1], [1, 0, 0]],
  type: ['>=', '>=', '>=']
}

export const constSecondValues = [0, 12/5, 1/5]

