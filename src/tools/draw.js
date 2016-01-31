let checkCord = (x, y, arr) => arr.some(([a, b]) => x == a && y == b)

export default system => {
  let {constraints, func} = system
  let input = system.input
  JXG.Options.renderer = 'canvas'
  JXG.Options.text.display = 'internal'
  const board = JXG.JSXGraph.initBoard('jxgbox', {
    boundingbox: [-0.5, 8, 8, -0.5],
    axis: false,
    showNavigation: false,
    showCopyright: false
  })
  let name = 0
  let graph = []
  let cords = []
  board.create('axis', [[0, 0], [1, 0]], {
    name: 'x1',
    withLabel: true,
    label: {offset: [283, 15], fontSize: 16}
  })
  board.create('axis', [[0, 0], [0, 1]], {
    name: 'x2',
    withLabel: true,
    label: {offset: [15, 290], fontSize: 16}
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
        label: {position: 'top', offset: [5, 5]},
        strokeWidth: 2
      }
    )
    graph.push(line)
  })
  let p1 = board.create('point', [0, 0], {visible: false, name: (++name).toString()})
  let p2 = board.create('point', func.z, {visible: false, name: (++name).toString()})
  board.create('arrow', [p1, p2], {color: 'red', strokeWidth: 2})
  graph.forEach((l1, i) => {
    graph.forEach((l2, j) => {
      if (i >= j) return
      let point = board.create('intersection', [l1, l2, 0], {label: {fontSize: 16}})
      checkPoint(point)
    })
  })
  constraints.b.forEach((b, index) => {
    let point = board.create('point', [0, b / constraints.a[index][1]], {label: {fontSize: 16}})
    checkPoint(point)
    point = board.create('point', [b / constraints.a[index][0], 0], {label: {fontSize: 16}})
    checkPoint(point)
  })
  board.clickUpArrow()
  board.clickDownArrow()
 function checkPoint(point) {
   let x = point.X()
   let y = point.Y()
   let isCord = checkCord(x, y, cords)
   if (!isCord) cords.push([x, y])
   if (isCord || isNaN(y) || isNaN(x) || y > 7.9 || y < 0 || x > 7.9 || x < 0) {
     point.setAttribute({visible: false, name: (++name).toString(), label: {fontSize: 16}})
   }
 }
}