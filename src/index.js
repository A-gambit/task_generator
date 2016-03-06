import React from 'react'
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Router, Route, IndexRoute} from 'react-router'
import App from './pages/app'
import Generate from './pages/generate'
import FirstTest from './pages/test_1'
import SecondTest from './pages/test_2'

injectTapEventPlugin()

const router = (
  <Router>
    <Route path="/" component={App}>
      <Route path="/test_1" component={FirstTest} />
      <Route path="/test_2" component={SecondTest} />
      <IndexRoute component={Generate} />
    </Route>
  </Router>
)

render(router, document.getElementById('app'))
