import { ofType, Epic } from 'redux-observable'
import { mergeMap, map } from 'rxjs/operators'
import { PayloadIn, PayloadOut } from '@/types'
import { userApi } from '@/servers'
import { userAction } from '@/actions'
import { createAction } from '@/utils/helpers'
import { HttpCode } from '@/enums'

/**
 * 登录获取用户信息
 * @param $action
 */
export const getLogin: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`user/${userAction.GET_LOGIN_EPIC}`),
    mergeMap(action => {
      return userApi.getLogin(action.payload).pipe(
        map(res => {
          try {

            if (res.data.code === HttpCode.SUCCESS) {
              return createAction(
                `user/${userAction.UPDATE_LOGIN_REDUCER}`,
                {
                  data: res.data.data,
                  msg: res.data.msg
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
 * 获取图形验证码
 * @param $action
 */
export const getRandCode: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`user/${userAction.GET_RAND_CODE_EPIC}`),
    mergeMap(action => {
      return userApi.getRandCode().pipe(
        map(res => {
          try {
            if (res.data.code === HttpCode.SUCCESS) {
              return createAction(
                `user/${userAction.UPDATE_RAND_CODE_REDUCER}`,
                {
                  data: res.data.data
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
 * 注册
 * @param $action
 */
export const getRegister: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`user/${userAction.GET_REGISTER_EPIC}`),
    mergeMap(action => {
      return userApi.getRegister(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code) {
              return createAction(
                `user/${userAction.UPDATE_REGISTER_REDUCER}`,
                {
                  msg: res.data.msg
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
 * 获取找回、绑定验证码
 * @param $action
 */
export const getCode: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`user/${userAction.GET_CODE_EPIC}`),
    mergeMap(action => {
      return userApi.getCode(action.payload).pipe(
        map(res => {
          try {
            if (res.data.status_code === HttpCode.SUCCESS) {
              return createAction(
                `user/${userAction.UPDATE_CODE_REDUCER}`,
                {
                  data: res.data.data
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
 * 获取用户信息
 * @param $action
 */
export const getUserInfo: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`user/${userAction.GET_USER_INFO}`),
    mergeMap(action => {
      return userApi.getUserInfo(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code === HttpCode.SUCCESS) {
              return createAction(
                `user/${userAction.UPDATE_USER_INFO_REDUCER}`,
                {
                  data: res.data.data
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
 * 获取用户信息
 * @param $action
 */
export const getUserCareList: Epic<PayloadIn, PayloadOut, any> = $action => {
  return $action.pipe(
    ofType(`user/${userAction.GET_USER_CARE_LIST}`),
    mergeMap(action => {
      return userApi.updateFieldLevel(action.payload).pipe(
        map(res => {
          try {
            if (res.data.code === HttpCode.SUCCESS) {
              return createAction(
                `user/${userAction.UPDATE_USER_CARE_LIST_REDUCER}`,
                {
                  data: res.data.data
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
