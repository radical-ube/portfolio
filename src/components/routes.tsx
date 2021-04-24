import React from 'react'
import { connect } from 'react-redux'

import { About, Contact, Projects, Experience, Home } from './pages'

const Routes = (props: any) => {
  const { currentPage } = props
  return (
    <div>
      {currentPage === 'home' ? (
        <Home />
      ) : currentPage === 'about' ? (
        <About />
        // <Home />
      ) : currentPage === 'projects' ? (
        // <Projects />
        <Home />
      ) : currentPage === 'experience' ? (
        // <Experience />
        <Home />
      ) : currentPage === 'contact' ? (
        // <Contact />
        <Home />
      ) : (
        <Home />
      )}
    </div>
  )
}

const mapState = (state: any) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Routes)