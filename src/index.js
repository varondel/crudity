import React from 'react';
import ReactDOM from 'react-dom';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// react-router-dom
import { BrowserRouter } from 'react-router-dom'

// redux
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store from './store'

import { Provider } from 'react-redux'

// css
import 'semantic-ui-css/semantic.min.css';


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
