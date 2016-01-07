import System from './system'
import generate from '../tools/generate'
import {random} from '../tools/random'

class Generation {
  constructor(number) {
    this.systems = this.generateSystems(number)
    this.tests = this.generationTest()
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
          values.every(x => Number.isInteger(x)) &&
          point.every(x => Number.isInteger(x))
        )
        if (isReturn) return {system, point, result, values}
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

  generationTest() {
    return this.systems.map(({system, point, result, values}) => {
      let questions = values.map((y, index) => {
        let question =  {
          question: `Яка цінність ресурсу ${index + 1}?`,
          test: [],
          correct: random(4)
        }
        for (let i = 0; i < 4; ++i)
          question.test.push(y + question.correct - i)
        return question
      })
      questions.unshift({
        question: 'Вкажіть точку оптимуму?',
        correct: point
      })
      questions.unshift({
        question: 'Вкажіть оптимальне значення цільвої функції?',
        correct: result
      })
      questions.pop()
      questions.push({
        question: `Яка цінність ресурсу ${values.length}?`,
        correct: values[values.length - 1]
      })
      return questions
    })
  }
}

export default Generation