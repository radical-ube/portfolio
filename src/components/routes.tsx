// eslint-disable-next-line
import React from 'react'
import { connect } from 'react-redux'

import { 
  About, 
  Contact, 
  Projects, 
  Experience, 
  Home 
} from './pages'

import {
  rainbowData,
  ekopiqueData,
  portfolioData
} from '../components/setups/'

type Props = {
  currentPage: {
    tab: string
  }
}

type State = {
  currentPage: {
    tab: string
  }
}

const Routes = (props: Props) => {
  const { currentPage } = props
  const { tab } = currentPage
  return (
    <div>
      {tab === 'home' ? (
        <Home />
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
        <Home />
      )}
    </div>
  )
}

const mapState = (state: State) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapState)(Routes)