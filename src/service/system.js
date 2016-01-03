class System {
  constructor({func, limitations}) {
    this.func = func
    this.limitations = limitations
  }

  get slr() {
    const isMax = this.func.type == 'max'
    const type = isMax ? '>' : '<'
    let res = {
      func: {
        type: isMax ? 'min' : 'max',
        w: this.limitations.b
      },
      limitations: {
        b: this.func.z
      }
    }
    res.limitations.type = this.limitations.type((memo, item) => {
      if (item == '>' || item == '<') memo.push(type, type)
      else memo.push(type)
      return memo
    }, [])
  }

  get value() {
    const {func, limitations} = this
    return {func, limitations}
  }
}

export default System