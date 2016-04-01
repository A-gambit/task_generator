let checkCord = (x, y, arr) => arr.some(([a, b]) => x == a && y == b)

export default (system, poligon) => {
  const labelSize = {label: {fontSize: 18}}
  let {constraints, func} = system
  let input = system.input
  JXG.Options.renderer = 'canvas'
  JXG.Options.text.display = 'internal'
  const board = JXG.JSXGraph.initBoard('jxgbox', {
    boundingbox: [-0.5, 9.5, 9.5, -0.5],
    axis: false,
    showNavigation: false,
    showCopyright: false
  })
  let name = 0
  let graph = []
  let cords = []
  let points = []
  board.create('axis', [[0, 0], [1, 0]], {
    name: 'x1',
    withLabel: true,
    label: {offset: [255, 15], fontSize: labelSize.label.fontSize}
  })
  board.create('axis', [[0, 0], [0, 1]], {
    name: 'x2',
    withLabel: true,
    label: {offset: [15, 263], fontSize: labelSize.label.fontSize}
  })
  constraints.b.forEach((b, index) => {
    let line = board.create('functiongraph',
      [x => {
        let y = (constraints.a[index][0] * -1 * x + b) / constraints.a[index][1]
        return y >= 0 ? y : NaN
      }, 0, 9],
      {
        name: input.constraints[index],
        withLabel: false,
        strokeWidth: 2
      }
    )
    graph.push(line)
  })
  let p1 = board.create('point', [0, 0], {visible: false, name: (++name).toString()})
  let p2 = board.create('point', func.z, {visible: false, name: (++name).toString()})
  board.create('arrow', [p1, p2], {color: 'red', strokeWidth: 3})
  graph.forEach((l1, i) => {
    graph.forEach((l2, j) => {
      if (i >= j) return
      let point = board.create('intersection', [l1, l2, 0], labelSize)
      points.push(point)
      checkPoint(point)
    })
  })
  constraints.b.forEach((b, index) => {
    let point = board.create('point', [0, b / constraints.a[index][1]], labelSize)
    checkPoint(point)
    point = board.create('point', [b / constraints.a[index][0], 0], labelSize)
    checkPoint(point)
  })


  if (poligon) {
    let allPoints = [...points].filter(point => !isNaN(point.X()) && !isNaN(point.Y()))
    let checkPoints = allPoints
      .filter((point, i) => !allPoints.some((p, j) => j < i && p.X() == point.X() && p.Y() == point.Y()))
      .filter(point => checkInRange(system.constraints, point.X(), point.Y()))
    let polygonPoints = [p1, ...checkPoints].sort((a, b) => {
      return a.X() > b.X()
    })
    let poly = board.createElement('polygon', polygonPoints, {appendChildPrim: -1})
  }

  board.clickUpArrow()
  board.clickDownArrow()

  function checkInRange ({a, b}, x, y) {
    return a.every(([i, j], index) => i * x + y * j <= b[index]) && x >= 0 && y >= 0
  }
  function checkPoint(point) {
    let x = point.X()
    let y = point.Y()
    let isCord = checkCord(x, y, cords)
    if (!isCord) {
      cords.push([x, y])
      points.push(point)
    }
    if (isCord || isNaN(y) || isNaN(x) || y > 9.9 || y < 0 || x > 9.9 || x < 0) {
      point.setAttribute({visible: false, name: (++name).toString(), label: labelSize.label})
    }
  }
}
