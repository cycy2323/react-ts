import { ofType, Epic } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { PayloadIn, PayloadOut } from '@/types'
import { homeApi } from '@/servers'
import { homeAction } from '@/actions'
import { createAction } from '@/utils/helpers'
import { HttpCode } from '@/enums'

/**
 * 获取顶部直播列表
 * @param $action
 */
export const getLiveList: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`home/${homeAction.GET_LIVE_LIST_EPIC}`),
    mergeMap(action => {
      return homeApi.getLiveList(action.payload).pipe(
        map(res => {
          try {

            if (res.data.code === HttpCode.SUCCESS) {
              return createAction(
                `home/${homeAction.UPDATE_LIVE_LIST_REDUCER}`,
                {
                  data: res.data.data,
                }
              )
            }
            return createAction('app')
          } catch (error) {
            return createAction('app')
          }
        })
      )
    })
  )
}


/**
 * 获取正在热播
 * @param $action
 */
export const getHotNowLiveList: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`home/${homeAction.GET_HOT_NOW_LIVE_LIST_EPIC}`),
    mergeMap(action => {
      return homeApi.getLiveList(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code === HttpCode.SUCCESS) {
              return createAction(
                `home/${homeAction.UPDATE_HOT_NOW_LIVE_LIST_REDUCER}`,
                {
                  data: res.data.data,
                }
              )
            }
            return createAction('app')
          } catch (error) {
            return createAction('app')
          }
        })
      )
    })
  )
}



/**
 * 有趣的主播列表
 * @param $action
 */
export const getInterestingAnchor: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`home/${homeAction.GET_INTERESTING_ANCHOR_EPIC}`),
    // ofType(`user/${userAction.GET_RAND_CODE_EPIC}`),
    mergeMap(action => {
      return homeApi.getInterestingAnchor(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code === HttpCode.SUCCESS) {
              return createAction(
                `home/${homeAction.UPDATE_INTERESTING_ANCHOR_REDUCER}`,
                {
                  data: res.data.data,
                }
              )
            }
            return createAction('app')
          } catch (error) {
            return createAction('app')
          }
        })
      )
    })
  )
}
