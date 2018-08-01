export const LOGIN_WITH_EMAIL = 'LOGIN_WITH_EMAIL'
export const SET_RECIPES = 'SET_RECIPES'

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
