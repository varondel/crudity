import {
  SET_EDIT_RECIPE,
  LOGOUT
} from '../actions/UserActions'

function edit(state = {isEditing : false}, action) {

  switch (action.type) {

    case SET_EDIT_RECIPE :

      return {
        ...state,
        isEditing : action.params.isEditing, 
        recipeInfo: action.params.recipeInfo
      }
      
    case LOGOUT : 
      return {}

    default :
      return state
  }
}

export default edit
