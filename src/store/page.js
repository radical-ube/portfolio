import {
  environment,
  sketchFns,
  aboutEnv,
  aboutFns
} from '../components/pages/pagesettings'

const initialState = {
  tab: 'home',
  env: environment,
  sketch: sketchFns
}

const SET_PAGE = 'SET_PAGE'

const setPage = page => ({
  type: SET_PAGE,
  page
})

export const setCurrentPage = tab => dispatch => {
  const page = initialState

  switch (tab) {
    case 'home':
      dispatch(setPage({
        tab: 'home',
        env: environment,
        sketch: sketchFns
      }))
      break
    case 'about':
      dispatch(setPage({
        tab: 'about',
        env: aboutEnv,
        sketch: aboutFns
      }))
      break
    default:
      dispatch(setPage(page))
      break
  }
}


const currentPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.page
    default:
      return state
  }
}

export default currentPageReducer