import React from 'react'
import { connect } from 'react-redux'

import { About, Contact, Projects, Experience, Page } from './pages'

const Routes = (props: any) => {
  const { currentPage } = props
  return (
    <div>
      {currentPage === 'home' ? (
        <Page />
      ) : currentPage === 'about' ? (
        <About />
        // <Page />
      ) : currentPage === 'projects' ? (
        // <Projects />
        <Page />
      ) : currentPage === 'experience' ? (
        // <Experience />
        <Page />
      ) : currentPage === 'contact' ? (
        // <Contact />
        <Page />
      ) : (
        <Page />
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