import {assert} from 'chai'
import System from '../../src/service/system'

let system = null

const constSystem = {
  func: {
    z: [1, 1],
    type: 'max'
  },
  limitations: {
    b: [5, 10],
    a: [[0, 1], [1/2, 2/3]],
    type: ['<', '>']
  }
}

const constSlr = {
  func: {
    w: [5, 10],
    type: 'min'
  },
  limitations: {
    b: [5, 10],
    a: [[0, 1/2], [1, 3/2], [-1, 0]],
    type: ['>', '>', '>', '>']
  }
}

describe('company error tests', () => {
  before(done => {
    system = new System(tmpSystem)
    done()
  })

  it('check system', done => {
    assert.deepEqual(system.value, constSystem)
    done()
  })

  it('check slr', done => {
    assert.deepEqual(system.srl, constSlr)
    done()
  })
})