import { scoreAction } from '@/actions';
import { Action } from '@/types';
export interface ScoreStore {
  previewList: any[],
  matchsList: any[]
  headnavIndex: number
}

const initStore: ScoreStore = {
  previewList: [],
  matchsList: [],
  headnavIndex: 1
}

// 图形验证码
export default function scoreReducer(
  state: ScoreStore = initStore,
  action: Action
): ScoreStore {
  const data = JSON.parse(JSON.stringify(state));
  try {
    switch (action.type) {
      // 更新randCode数据
      case `score/${scoreAction.UPDATE_TOURNAMENT_PREVIEW}`: {
        return Object.assign(data, {
          ...data,
          previewList: action.payload.data
        })
      }
      case `score/${scoreAction.UPDATE_MATCH}`: {
        return Object.assign(data, {
          ...data,
          matchsList: action.payload.data
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
