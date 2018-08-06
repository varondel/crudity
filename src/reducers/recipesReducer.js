import {
  SET_RECIPES,
} from '../actions/UserActions'

function recipes (state = [], action) {

  switch (action.type) {

    case SET_RECIPES :
    
      const recipes = action.params

      return [
        ...recipes
      ]

    default :
      return state
  }
}

export default recipes
