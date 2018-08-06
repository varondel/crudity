import React from 'react';
import ReactDOM from 'react-dom';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// react-router-dom
import { BrowserRouter } from 'react-router-dom'

// redux
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';

import reducer from './reducers'
import { Provider } from 'react-redux'

// css
import 'semantic-ui-css/semantic.min.css';

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

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
