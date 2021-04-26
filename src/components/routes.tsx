import React from 'react'
import { connect } from 'react-redux'

import { 
  About, 
  Contact, 
  // Projects, 
  Experience, 
  Page 
} from './pages'

const Routes = (props: any) => {
  const { currentPage } = props
  const { tab } = currentPage
  return (
    <div>
      {tab === 'home' ? (
        <Page />
      ) : tab === 'about' ? (
        <About />
      ) : tab === 'projects' ? (
        // <Projects />
        <Page />
      ) : tab === 'experience' ? (
        <Experience />
        // <Page />
      ) : tab === 'contact' ? (
        <Contact />
        // <Page />
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