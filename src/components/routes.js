import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Canvas from './canvas'
import {About, Contact, Projects, Resume} from './pages'

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/resume" component={Resume} />
      <Route component={Canvas} />
    </Switch>
  )
}

export default Routes