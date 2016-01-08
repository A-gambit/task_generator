export default system => {
  let {constraints, func} = system

  JXG.Options.renderer = 'canvas'
  JXG.Options.text.display = 'internal'

  const board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-0.5,10,10,-0.5], axis:true})
  constraints.b.forEach((b, index) => {
    const y = `${(constraints.a[index][0] * -1) / constraints.a[index][1]}*x + ${b/constraints.a[index][1]}`
    let f = board.jc.snippet(y, true, 'x', false)
    board.create('functiongraph',[f,
      () => {
        let c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],board)
        return c.usrCoords[1]
      },
      () => {
        var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[board.canvasWidth,0],board);
        return c.usrCoords[1]
      }
    ])
  })
}