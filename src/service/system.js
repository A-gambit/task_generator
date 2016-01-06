import toString from '../tools/toString'
import YASMIJ from  'yasmij'

class System {
  constructor({func, constraints}) {
    this.func = func
    this.constraints = constraints
  }

  notStraight() {
    const isMax = this.func.type == 'max'
    const type = isMax ? '>=' : '<='
    let res = {
      func: {type: isMax ? 'min' : 'max', w: this.constraints.b},
      constraints: {b: [], a: [], type: []}
    }
    let sConstraints = {
      type: [], b: [],
      a: this.constraints.type
        .filter(item => item == '>=' || item == '<=')
        .map(item => this.constraints.type.map(item => 0))
    }
    this.constraints.type.forEach((item, index) => {
      res.constraints.type.push(type)
      res.constraints.b.push(this.func.z[index])
      res.constraints.a.push(this.constraints.a.map(a => a[index]))
      if (item == '>=' || item == '<=') {
        sConstraints.type.push(type)
        sConstraints.a[index][index] = item == '>=' ? -1 : 1
        sConstraints.b.push(0)
      }
    })
    for (let key in sConstraints)
      res.constraints[key] = sConstraints[key].reduce((memo, item) => {
        memo.push(item)
        return memo
      }, res.constraints[key])
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
    let {constraints} = this.notStraight()
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
    let resource = this.getBasicResource()
    let values = []
    return values
  }
}

export default System