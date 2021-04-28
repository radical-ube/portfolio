import {
  LoadedImageData
} from '../components/types'

const initialState: LoadedImageData[] = []

const SET_IMAGES = 'SET_IMAGES'

const setImages = (images: LoadedImageData[]) => ({
  type: SET_IMAGES,
  images
})

export const setLoadedImages = (images: LoadedImageData[]) => (dispatch: any) => {
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