import {
  SET_EDIT_RECIPE,
  LOGOUT
} from '../actions/UserActions'

function edit(state = {isEditing: false, isUpdating: false}, action) {

  switch (action.type) {

    case SET_EDIT_RECIPE :

      return {
        ...state,
        isEditing : action.params.isEditing,
        isUpdating : action.params.isUpdating,
        recipeInfo: action.params.recipeInfo
      }
      
    case LOGOUT : 
      return {}

    default :
      return state
  }
}

export default edit
