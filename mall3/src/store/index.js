import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import user from './reducers/user';

const rootReducers = combineReducers({
  user
});

export default createStore(rootReducers, composeWithDevTools());
