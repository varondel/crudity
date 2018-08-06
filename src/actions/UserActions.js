export const LOGIN_WITH_EMAIL = 'LOGIN_WITH_EMAIL'
export const SET_RECIPES = 'SET_RECIPES'
export const SET_EDIT_RECIPE = 'SET_EDIT_RECIPE'
export const LOGOUT = 'LOGOUT'

export function loginWithEmailRedux ({ params }) {

  return {
    type: LOGIN_WITH_EMAIL,
    params
  }
}

export function setRecipesRedux ({ params }) {

  return {
    type: SET_RECIPES,
    params
  }
}

export function setEditRecipeRedux ({params}) {

  return {
    type: SET_EDIT_RECIPE,
    params
  }
}

export function logoutRedux (params) {

  return {
    type: LOGOUT,
    params
  }
}