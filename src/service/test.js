import Generation from './generation'

class Test extends Generation {
  constructor() {
    super()
    this.system = super.generateOne()
    this.tests = super.generationTest(this.system)
  }

  draw() {
    super.draw(this.system.system)
  }
}

export default Test
