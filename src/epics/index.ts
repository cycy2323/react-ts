import { combineEpics } from 'redux-observable';
import * as staticEpic from './staticEpic';

function distructor(obj: any) {
  return Object.keys(obj).map((item, index) => {
    return obj[item];
  });
}

const rootEpic = combineEpics(...distructor(staticEpic));

export default rootEpic;
