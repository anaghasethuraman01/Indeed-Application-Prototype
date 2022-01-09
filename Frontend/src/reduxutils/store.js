import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk"
import reducers from './reducer/reducers.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import {persistStore} from "redux-persist";

export const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk),
));

export const persistor = persistStore(store);