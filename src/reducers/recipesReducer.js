import {
  SET_RECIPES,
} from '../actions/UserActions'

function recipes (state = {recipes : []}, action) {

  switch (action.type) {

    case SET_RECIPES :
    
      const { recipes } = action.params

      return {
        ...state,
        recipes
      }

    default :
      return state
  }
}

export default recipes
