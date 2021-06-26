import { ofType, Epic } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { PayloadIn, PayloadOut } from '@/types';
import { staticApi } from '@/servers';
import { staticAction } from '@/actions';
import { createAction } from '@/utils/helpers';
import { HttpCode } from '@/enums';

/**
 * 获取preinfo
 * @param $action
 */
export const getPreinfo: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`static/${staticAction.GET_PREINFO_EPIC}`),
    mergeMap(action => {
      return staticApi.getPreInfo().pipe(
        map(res => {
          try {
            if (res.data.status_code === HttpCode.SUCCESS) {
              return createAction(
                `static/${staticAction.UPDATE_PREINFO_REDUCER}`,
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
