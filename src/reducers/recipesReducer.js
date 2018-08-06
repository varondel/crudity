import {
  SET_RECIPES,
  LOGOUT
} from '../actions/UserActions'

function recipes (state = [], action) {

  switch (action.type) {

    case SET_RECIPES :
    
      const recipes = action.params

      return [
        ...recipes
      ]

    case LOGOUT : 
      return {}

    default :
      return state
  }
}

export default recipes
