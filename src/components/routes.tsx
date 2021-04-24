import React from 'react'
import { connect } from 'react-redux'

import { About, Contact, Projects, Experience, Home } from './pages'

const Routes = (props: any) => {
  const { currentPage, bgColor } = props
  return (
    <div>
      {currentPage === 'home' ? (
        <Home bgColor={bgColor} />
      ) : currentPage === 'about' ? (
        <About bgColor={bgColor} />
      ) : currentPage === 'projects' ? (
        <Projects bgColor={bgColor} />
      ) : currentPage === 'experience' ? (
        <Experience bgColor={bgColor} />
      ) : currentPage === 'contact' ? (
        <Contact bgColor={bgColor} />
      ) : (
        <Home bgColor={bgColor} />
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