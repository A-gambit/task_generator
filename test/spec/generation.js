import {assert} from 'chai'
import Generation from '../../src/service/generation'

describe('generation tests', () => {
  it('check generation', function(done) {
    this.timeout(30000)
    let generation = new Generation(10)
    generation.systems.forEach(({system, point, result, values}, index) => {
      let tests = generation.tests[index]
      assert.deepEqual(tests[0].correct, result)
      assert.deepEqual(tests[1].correct, point)
      assert.deepEqual(tests[2].test[tests[2].correct], values[0])
      assert.deepEqual(tests[3].test[tests[3].correct], values[1])
      assert.deepEqual(tests[4].correct, values[2])
    })
    done()
  })
})