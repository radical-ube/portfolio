const initialState: any[] = []

const SET_IMAGES = 'SET_IMAGES'

const setImages = (images: any[]) => ({
  type: SET_IMAGES,
  images
})

export const setLoadedImages = (images: any[]) => (dispatch: any) => {
  dispatch(setImages(images))
}

const loadedImagesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_IMAGES:
      return action.images
    default:
      return state
  }
}

export default loadedImagesReducer