import {
  environment,
  sketchFns,
  aboutEnv,
  aboutFns,
  projectEnv,
  projectFns,
  experienceEnv,
  experienceFns,
  contactEnv,
  contactFns
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
    case 'projects':
      dispatch(setPage({
        tab: 'projects',
        env: projectEnv,
        sketch: projectFns
      }))
      break
    case 'experience':
      dispatch(setPage({
        tab: 'experience',
        env: experienceEnv,
        sketch: experienceFns
      }))
      break
    case 'contact':
      dispatch(setPage({
        tab: 'contact',
        env: contactEnv,
        sketch: contactFns
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