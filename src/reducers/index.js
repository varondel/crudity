import { combineReducers } from 'redux'
import user from './userReducer'
import recipes from './recipesReducer'
import edit from './editReducer'

export default combineReducers({
  user,
  recipes,
  edit
})
