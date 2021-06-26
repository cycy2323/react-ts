
import { ofType, Epic } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { PayloadIn, PayloadOut } from '@/types';
import { scoreApi } from '@/servers';
import { scoreAction } from '@/actions';
import { createAction } from '@/utils/helpers';
import { HttpCode } from '@/enums';

/**
 * 获取赛事预告
 * @param $action
 */
export const getNotice: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`score/${scoreAction.GET_TOURNAMENT_PREVIEW}`),
    mergeMap(action => {
      return scoreApi.getNotice(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code === HttpCode.SUCCESS) {
              return createAction(
                `score/${scoreAction.UPDATE_TOURNAMENT_PREVIEW}`,
                {
                  data: res.data.data
                }
              );
            }
            return createAction('app');
          } catch (error) {
            return createAction('app');
          }
        })
      );
    })
  );
};

/**
 * 获取赛事
 * @param $action
 */
export const getMatch: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`score/${scoreAction.GET_MATCH}`),
    mergeMap(action => {
      return scoreApi.getMatch(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code === HttpCode.SUCCESS) {
              return createAction(
                `score/${scoreAction.UPDATE_MATCH}`,
                {
                  data: res.data.data
                }
              );
            }
            return createAction('app');
          } catch (error) {
            return createAction('app');
          }
        })
      );
    })
  );
};
