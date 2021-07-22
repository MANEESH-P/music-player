import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import reducers from './redux/reducers';
import { saveState, getState } from './redux/store/localStore';
import { composeWithDevTools } from 'redux-devtools-extension';
import mediaNotification from './utils/mediaSession';
import * as serviceWorker from "./serviceWorker";

getState().then((localState) => {
  let store;
  store = createStore(reducers, localState, composeWithDevTools());
  store.subscribe(() => {
    saveState({
      songs: store.getState().songs,
    });
  });
  mediaNotification.setStore(store);
  store.subscribe(() => {
    saveState({
      songs: store.getState().songs,
    });
  });

  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
