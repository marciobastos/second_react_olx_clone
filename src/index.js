import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './Reducers';
import App from './App';

const store = createStore(Reducers);


ReactDOM.render(

  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
);