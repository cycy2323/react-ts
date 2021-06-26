import { homeAction } from '@/actions';
import { Action } from '@/types';

interface Data {
  page: string | number
  pages: string | number
  rows: []
  size: string | number
  total: string | number
}

export interface HomeStore {
  data: Data,
  bottomData: Data,
  interestingAnchor: any
}

const initStore: HomeStore = {
  data: {
    page: '',
    pages: '',
    rows: [],
    size: '',
    total: ''
  },
  bottomData: {
    page: '',
    pages: '',
    rows: [],
    size: '',
    total: ''
  },
  interestingAnchor: []
};

export default function HomeReducer(
  state: HomeStore = initStore,
  action: Action
): HomeStore {
  try {
    switch (action.type) {

      // 更新6条数据
      case `home/${homeAction.UPDATE_LIVE_LIST_REDUCER}`: {
        return Object.assign(state, {
          ...state,
          data: action.payload.data
        })
      }
      // 更新8条数据
      case `home/${homeAction.UPDATE_HOT_NOW_LIVE_LIST_REDUCER}`: {
        return Object.assign(state, {
          ...state,
          bottomData: action.payload.data
        })
      }

      // 有趣直播列表
      case `home/${homeAction.UPDATE_INTERESTING_ANCHOR_REDUCER}`: {
        return Object.assign(state, {
          ...state,
          interestingAnchor: action.payload.data
        })
      }
      default: {
        return state
      }
    }
  } catch (error) {
    return state
  }
}
