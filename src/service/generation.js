import System from './system'
import generate from '../tools/generate'

class Generation {
  constructor(number) {
    this.systems = this.generateSystems(number)
  }

  generateOne() {
    while (true) {
      let system = new System(generate())
      try {
        let {z: result} = system.solve()
        let values = system.values()
        let isReturn = (
          result != 0 &&
          values.length == system.constraints.a.length &&
          Number.isInteger(result) &&
          values.every(x => Number.isInteger(x))
        )
        if (isReturn) return system
      }
      catch (e) {}
    }
  }

  generateSystems(number = 30) {
    let systems = []
    for (let i = 0; i < number; ++i) {
      systems.push(this.generateOne())
    }
    return systems
  }
}

export default Generation