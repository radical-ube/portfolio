import {
  environment,
  AboutEnv
} from '../components/pages/pagesettings'

const SET_ENV = 'SET_ENV'

const setEnv = env => ({
  type: SET_ENV,
  env
})

export const setCurrentEnv = env => dispatch => {
  dispatch(setEnv(env))
}

const initialState = environment

const envReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENV:
      return action.env
    default:
      return state
  }
}

export default envReducer