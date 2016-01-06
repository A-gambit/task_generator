export const constSystem = {
  func: {
    z: [2, 3],
    type: 'max'
  },
  constraints: {
    b: [6, 8],
    a: [[2, 1], [2, 4]],
    type: ['<=', '<=']
  }
}

export const constSlr = {
  func: {
    w: [6, 8],
    type: 'min'
  },
  constraints: {
    b: [2, 3, 0, 0],
    a: [[2, 2], [1, 4], [1, 0], [0, 1]],
    type: ['>=', '>=', '>=', '>=']
  }
}

export const constInput = {
  type: 'maximize',
  objective: '2x1 + 3x2',
  constraints: ['2x1 + x2 <= 6', '2x1 + 4x2 <= 8']
}

export const constAnswer = {
  x: [8/3, 2/3],
  z: 22/3,
  s: [0, 0]
}