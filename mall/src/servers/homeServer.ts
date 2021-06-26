import { get } from '@/utils/require';

/**
 * 获取preinfo信息接口
 */
export const getLiveList = (data: any) => {
  return get('/live-api/v1.2/rooms/pc', data)
}


/**
 * 获取preinfo信息接口
 */
export const getInterestingAnchor = (data: any) => {
  return get('/live-api/v0.1/anchors/mostFans', data)
}


