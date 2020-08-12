import React from 'react'
// import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { About, Contact, Projects, Resume, Home } from './pages'

const Routes = props => {
  const { currentPage } = props
  return (
    <div>
      {currentPage === 'home' ? (
        <Home />
      ) : currentPage === 'about' ? (
        <About />
      ) : currentPage === 'projects' ? (
        <Projects />
      ) : currentPage === 'resume' ? (
        <Resume />
      ) : currentPage === 'contact' ? (
        <Contact />
      ) : (
        <Home />
      )
    }
      {/* {currentPage === 'about' && (
      )}
      {currentPage === 'projects' && (
      )}
      {currentPage === 'resume' && (
      )}
      {currentPage === 'contact' && (
      )} */}
    </div>
   
  )
}

const mapState = state => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Routes)