import {
  SET_EDIT_RECIPE,
} from '../actions/UserActions'

function edit(state = {isEditing : false}, action) {

  switch (action.type) {

    case SET_EDIT_RECIPE :

      return {
        ...state,
        isEditing : action.params.isEditing, 
        recipeInfo: action.params.recipeInfo
      }

    default :
      return state
  }
}

export default edit
