import {assert} from 'chai'
import System from '../../src/service/system'
import {constSystem, constSlr, constInput, constAnswer, constBasicResource, constValues} from '../data/first'
import {constSecondSystem, constSecondAnswer, constSecondSlr, constBasicSecondResource, constSecondValues} from '../data/second'

let system = null

describe('system tests', () => {
  before(done => {
    system = new System(constSystem)
    done()
  })

  it('check system', done => {
    assert.deepEqual(system.data, constSystem)
    done()
  })

  it('check notStraight', done => {
    assert.deepEqual(system.getNotStraight(), constSlr)
    done()
  })

  it('check input', done => {
    assert.deepEqual(system.input, constInput)
    done()
  })

  it('check solve first', done => {
    const res = system.solve()
    constAnswer.s.forEach((s, index) => assert.closeTo(res.s[index], s, 0.000001))
    constAnswer.x.forEach((x, index) => assert.closeTo(res.x[index], x, 0.000001))
    assert.closeTo(constAnswer.z, res.z, 0.000001)
    done()
  })

  it('check equal resource', done => {
    assert.deepEqual(system.getBasicResource(), constBasicResource)
    done()
  })

  it('check values', done => {
    system.values().forEach((x, index) =>  assert.closeTo(x, constValues[index], 0.000001))
    done()
  })

  it('check solve second', done => {
    let newSystem = new System(constSecondSystem)
    const res = newSystem.solve()
    assert.deepEqual(newSystem.data, constSecondSystem)
    assert.deepEqual(newSystem.getNotStraight(), constSecondSlr)
    constSecondAnswer.s.forEach((s, index) => assert.closeTo(res.s[index], s, 0.000001))
    constSecondAnswer.x.forEach((x, index) => assert.closeTo(res.x[index], x, 0.000001))
    assert.closeTo(constSecondAnswer.z, res.z, 0.000001)
    assert.deepEqual(newSystem.getBasicResource(), constBasicSecondResource)
    newSystem.values().forEach((x, index) =>  assert.closeTo(x, constSecondValues[index], 0.000001))
    done()
  })
})