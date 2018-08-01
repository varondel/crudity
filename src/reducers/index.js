import { combineReducers } from 'redux'
import user from './userReducer'
import recipes from './recipesReducer'

export default combineReducers({
  user,
  recipes
})
