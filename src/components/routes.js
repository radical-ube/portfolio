import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'

import {About, Contact, Projects, Resume, Home} from './pages'

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/resume" component={Resume} />
      <Route component={Home} />
    </Switch>
  )
}

const mapState = state => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Routes)