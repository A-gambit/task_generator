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
        let {z: result, x: point} = system.solve()
        let values = system.values()
        let isReturn = (
          result != 0 &&
          values.length == system.constraints.a.length &&
          Number.isInteger(result) &&
          values.every(x => Number.isInteger(x) && x >= 0) &&
          point.every(x => Number.isInteger(x))
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