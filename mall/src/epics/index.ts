import { combineEpics } from 'redux-observable';
import * as staticEpic from './staticEpic';
import * as userEpic from './userEpic';
import * as scoreEpic from './scoreEpic';
import * as homeEpic from './homeEpic';

function distructor(obj: any) {
  return Object.keys(obj).map((item, index) => {
    return obj[item];
  });
}

const rootEpic = combineEpics(...distructor(staticEpic), ...distructor(userEpic), ...distructor(homeEpic), ...distructor(scoreEpic));

export default rootEpic;
