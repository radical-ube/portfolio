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

const setPage = (page: any) => ({
  type: SET_PAGE,
  page
})

export const setCurrentPage = (tab: string) => (dispatch: any) => {
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


const currentPageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PAGE:
      return action.page
    default:
      return state
  }
}

export default currentPageReducer