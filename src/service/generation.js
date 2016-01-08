import System from './system'
import generate from '../tools/generate'
import {random} from '../tools/random'

const testKey = ['a', 'b', 'c', 'd']

const styles = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 0, 0, 10],
    alignment: 'justify'
  },
  subheader: {
    fontSize: 14,
    bold: true,
    margin: [0, 10, 0, 5]
  },
  system: {
    fontSize: 14
  },
  table: {
    margin: [0, 5, 0, 15]
  },
  tab: {
    alignment: 'justify',
    fontSize: 15
  },
  tableHeader: {
    bold: true,
    fontSize: 15,
    color: 'black'
  }
}

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

  generateSystems(number) {
    let systems = []
    for (let i = 0; i < number; ++i) {
      systems.push(this.generateOne())
    }
    return systems
  }

  generationTest() {
    return this.systems.map(({system, point, result, values}) => {
      let questions = values.map((y, index) => {
        const correct = random(4)
        let question =  {
          question: `Яка цінність ресурсу ${index + 1}?`,
          test: [],
          correct,
          correctKey: testKey[correct]
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

  draw(system, cb) {
    let Draw = require('./draw')
    let draw = new Draw(system)
    draw.draw()
    let svg = document.getElementById('plot').children[0]
    return `data:image/svg+xml;base64,${window.btoa(svg.outerHTML)}`
  }

  downloadQuestions() {
    let content = []
    let draw = this.draw
    this.systems.forEach(({system}, i) => {
      let input = system.input
      let image = draw(system)
      content.push({text: `Варіант №${i + 1}`, style: 'header'})
      content.push({text: `${system.func.type} z = ${input.objective}`, style: 'system'})
      //content.push({image})
      input.constraints.forEach(item => content.push({text: item, style: 'system'}))
      this.tests[i].forEach((item, index) => {
        content.push({text: `${index + 1}) ${item.question}`, style: 'subheader'})
        if (item.test) item.test.forEach((test, j) => content.push({text: `${testKey[j]}) ${test}`}))
      })
    })
    pdfMake.createPdf({content, styles}).download('questions.pdf')
  }

  downloadAnswers() {
    let content = [
      {text: 'Відповіді', style: 'header'},
      {style: 'table', table: {body: this.tests.map(test =>
        test.map(({correct, correctKey}) => {
          if (Array.isArray(correct)) return {text: correct.join(' '), style: 'tab'}
          return {text: correctKey || correct.toString(), style: 'tab'}
        }))}}
    ]
    content[1].table.body.unshift(this.tests[0].map((item, index) => {
      return {text: (index + 1).toString(), style: 'tableHeader'}
    }))
    pdfMake.createPdf({content, styles}).download('answers.pdf')
  }
}

export default Generation