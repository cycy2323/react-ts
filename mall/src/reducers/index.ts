import { combineReducers } from 'redux';
import staticReducer from './staticReducer';
import userReducer from './userReducer'
import scoreReducer from './scoreReducer'
import homeReducer from './homeReducer'

const rootReducer = combineReducers({
  statics: staticReducer,
  user: userReducer,
  score: scoreReducer,
  home: homeReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
