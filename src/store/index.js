// redux
import { createStore, applyMiddleware, compose } from 'redux'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './../reducers'

const logger = store => next => action => {
  //console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  //console.groupEnd(action.type)
  return result
}

const persistConfig = {
  key: 'root',
  storage: storage,
  //stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };

const pReducer = persistReducer(persistConfig, reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

console.log("CREATE Store !")
const store = createStore(
  pReducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
)

export default store