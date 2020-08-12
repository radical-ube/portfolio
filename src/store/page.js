const SET_PAGE = 'SET_PAGE'

const setPage = page => ({
  type: SET_PAGE,
  page
})

export const setCurrentPage = page => dispatch => {
  dispatch(setPage(page))
}

const initialState = 'home'

const currentPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.page
    default:
      return state
  }
}

export default currentPageReducer