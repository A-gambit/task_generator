import functionPlot from 'function-plot'

class Draw {
  constructor(system) {
    let {constraints, func} = system
    let input = system.input
    this.data = constraints.b.map((b, index) => {
      return {
        fn: `${constraints.a[index][0] * -1}x + ${b}`,
        text: input.constraints[index],
        color: 'blue'
      }
    })
    this.data.unshift({
      vector: func.z,
      offset: [0, 0],
      graphType: 'polyline',
      fnType: 'vector',
      color: 'red'
    })
  }

  draw() {
    functionPlot({
      target: '#plot',
      xAxis: {
        label: 'x1',
        domain: [0, 10]
      },
      yAxis: {
        label: 'x2',
        domain: [0, 10]
      },
      disableZoom: true,
      grid: true,
      data: this.data
    })
  }
}

export default Draw
