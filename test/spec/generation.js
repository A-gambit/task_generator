import {assert} from 'chai'
import Generation from '../../src/service/generation'

describe('generation tests', () => {
  it('check generation', function(done) {
    this.timeout(10000)
    let generation = new Generation(10)
    generation.systems.forEach(system => {
      console.log(system.input)
      console.log(system.solve())
      console.log(system.values())
    })
    done()
  })
})