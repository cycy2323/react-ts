import { staticAction } from '@/actions';
import { Action } from '@/types';

export interface StaticStore {
  preinfo: any;
}

const initStore: StaticStore = {
  preinfo: {}
};

export default function staticReducer(
  state: StaticStore = initStore,
  action: Action
): StaticStore {
  try {
    switch (action.type) {
      // 更新preinfo数据
      case `static/${staticAction.UPDATE_PREINFO_REDUCER}`: {
        return Object.assign(state, {
          ...state,
          preinfo: action.payload.data
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
