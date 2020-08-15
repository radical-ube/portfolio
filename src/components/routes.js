import React from 'react'
import { connect } from 'react-redux'

import { About, Contact, Projects, Resume, Home } from './pages'

const Routes = props => {
  const { currentPage, bgColor } = props
  return (
    <div>
      {currentPage === 'home' ? (
        <Home bgColor={bgColor} />
      ) : currentPage === 'about' ? (
        <About bgColor={bgColor} />
      ) : currentPage === 'projects' ? (
        <Projects bgColor={bgColor} />
      ) : currentPage === 'resume' ? (
        <Resume bgColor={bgColor} />
      ) : currentPage === 'contact' ? (
        <Contact bgColor={bgColor} />
      ) : (
        <Home bgColor={bgColor} />
      )}
    </div>
  )
}

const mapState = state => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Routes)