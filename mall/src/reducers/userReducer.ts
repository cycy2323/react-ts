import { userAction } from '@/actions';
import { Action } from '@/types';
import { sessionStorageGet, sessionStoragePut } from '@/utils/regular';
export interface Login {
  account?: string
  headImage?: string
  mobilePhone?: string | number | null
  nickName?: string
  sex?: number
  token?: string
  uid?: string
}
export interface UserStore {
  randCode: any;
  msg: string
  login: Login,
  userInfo: any,
  careList: Array<any>
}
// sessionStoragePut
// sessionStorageGet
const initStore: UserStore = {
  randCode: {},
  msg: '',
  login: sessionStorageGet('login', '') || {},
  userInfo: {},
  careList: []
}

// 图形验证码
export default function userReducer(
  state: UserStore = initStore,
  action: Action
): UserStore {
  try {
    switch (action.type) {
      // 更新randCode数据
      case `user/${userAction.UPDATE_RAND_CODE_REDUCER}`: {
        const data = JSON.parse(JSON.stringify(state));
        return Object.assign(data, {
          ...data,
          randCode: action.payload.data
        });
      }
      case `user/${userAction.UPDATE_REGISTER_REDUCER}`: {
        const data = JSON.parse(JSON.stringify(state));
        return Object.assign(data, {
          ...data,
          msg: action.payload.msg
        });
      }
      case `user/${userAction.UPDATE_LOGIN_REDUCER}`: {
        const data = JSON.parse(JSON.stringify(state))
        sessionStoragePut('login', action.payload.data)
        return Object.assign(data, {
          ...data,
          login: action.payload.data,
          msg: action.payload.msg
        });
      }
      case `user/${userAction.UPDATE_USER_INFO_REDUCER}`: {
        const data = JSON.parse(JSON.stringify(state));
        return Object.assign(data, {
          ...data,
          userInfo: action.payload.data
        });
      }
      case `user/${userAction.UPDATE_USER_CARE_LIST_REDUCER}`: {
        const data = JSON.parse(JSON.stringify(state));
        return Object.assign(data, {
          ...data,
          careList: action.payload.data
        });
      }

      default: {
        return state;
      }
    }
  } catch (error) {
    return state;
  }
}
