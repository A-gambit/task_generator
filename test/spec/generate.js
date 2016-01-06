import {assert} from 'chai'
import generate from '../../src/tools/generate'
import System from '../../src/service/system'

describe('generate tests', () => {
  it('check generate', done => {
    const constraintsKeys = ['b', 'a', 'type']
    let data = generate()
    assert.hasOwnProperty(data, 'func')
    assert.hasOwnProperty(data, 'constraints')
    assert.hasOwnProperty(data.func, 'z')
    assert.hasOwnProperty(data.func, 'type')
    assert.isArray(data.func.z)
    assert.isString(data.func.type)
    constraintsKeys.forEach(key => {
      assert.hasOwnProperty(data.constraints, key)
      assert.isArray(data.constraints[key])
    })
    done()
  })

  it('check system', done => {
    let data = generate()
    let system = new System(data)
    let res = system.solve()
    assert.isAbove(res.z, 0)
    done()
  })
})