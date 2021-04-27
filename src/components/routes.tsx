// eslint-disable-next-line
import React from 'react'
import { connect } from 'react-redux'

import { 
  About, 
  Contact, 
  Projects, 
  Experience, 
  Page 
} from './pages'

import {
  rainbowData,
  ekopiqueData,
  portfolioData
} from '../components/setups/'

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
        <div>
          <Projects projectData = {portfolioData}/>
          <Projects projectData = {ekopiqueData}/>
          <Projects projectData = {rainbowData}/>
        </div>
      ) : tab === 'experience' ? (
        <Experience />
      ) : tab === 'contact' ? (
        <Contact />
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