import toString from '../tools/toString'
import YASMIJ from  'yasmij'
import Linear from 'linear-solve'

class System {
  constructor({func, constraints}) {
    this.func = func
    this.constraints = constraints
  }

  getNotStraight() {
    const isMax = this.func.type == 'max'
    const type = isMax ? '>=' : '<='
    let res = {
      func: {type: isMax ? 'min' : 'max', w: this.constraints.b},
      constraints: {b: [], a: [], type: []}
    }
    this.func.z.forEach((item, index) => {
      res.constraints.type.push(type)
      res.constraints.b.push(this.func.z[index])
      res.constraints.a.push(this.constraints.a.map(a => a[index]))
    })
    this.constraints.type.forEach((item, i) => {
      if (item == '=') return
      res.constraints.type.push(type)
      res.constraints.a.push(this.constraints.a.map((x, j) => j == i ? 1 : 0))
      res.constraints.b.push(0)
    })
    return res
  }

  get data() {
    const {func, constraints} = this
    return {func, constraints}
  }

  get input() {
    return {
      type: this.func.type == 'max' ? 'maximize' : 'minimize',
      objective: toString(this.func.z),
      constraints: this.constraints.a
        .map((items, index) => `${toString(items)} ${this.constraints.type[index]} ${this.constraints.b[index]}`)
    }
  }

  solve() {
    let {result} = YASMIJ.solve(this.input)
    let answer = {z: 0, s: [], x: []}
    for (let key in result) {
      if (key == 'z') answer.z = result[key]
      else if (key.indexOf('x') > -1) answer.x.push(result[key])
      else if (key.indexOf('slack') > -1) answer.s.push(result[key])
    }
    return answer
  }

  getBasicResource() {
    let solve = this.solve()
    let {constraints} = this.getNotStraight()
    let resource = {b: [], a: [], type: []}
    solve.x.forEach((x, index) => {
      if (x <= 0) return
      for (let key in resource)
        resource[key].push(constraints[key][index])
    })
    solve.s.forEach((s, index) => {
      if (s <= 0) return
      for (let key in resource)
        resource[key].push(constraints[key][index + solve.x.length])
    })
    return resource
  }

  values() {
    let {a, b} = this.getBasicResource()
    return Linear.solve(a, b)
  }
}

export default System