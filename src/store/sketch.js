import {
  sketchFns
} from '../components/pages/pagesettings'

const SET_SKETCH = 'SET_SKETCH'

const setSketch = sketch => ({
  type: SET_SKETCH,
  sketch
})

export const setCurrentSketch = sketch => dispatch => {
  dispatch(setSketch(sketch))
}

const initialState = sketchFns

const sketchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SKETCH:
      return action.sketch
    default:
      return state
  }
}

export default sketchReducer