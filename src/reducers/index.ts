import { combineReducers } from 'redux';
import staticReducer from './staticReducer';

const rootReducer = combineReducers({
  statics: staticReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
