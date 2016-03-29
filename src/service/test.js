import Generation from './generation'

class Test extends Generation {
  constructor(polygon = false) {
    super()
    this.polygon = polygon
    this.system = super.generateOne()
    this.tests = super.generationTest(this.system)
  }

  draw() {
    super.draw(this.system.system, this.polygon)
  }
}

export default Test
