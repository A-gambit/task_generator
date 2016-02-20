import React from 'react'
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {Router, Route, IndexRoute} from 'react-router'
import App from './pages/app'
import Generate from './pages/generate'
import Test from './pages/test'

injectTapEventPlugin()

const router = (
  <Router>
    <Route path="/" component={App}>
      <Route path="/generate" component={Generate} />
      <IndexRoute component={Test} />
    </Route>
  </Router>
)

render(router, document.getElementById('app'))
