import { post, get } from '@/utils/require';
/**
 * 获取赛事遇搞
 */
export const getNotice = (data: any) => {
  return get('/sports-api/v1/pc/matchNotice', data)
}

/**
 * 获取赛事
 */
export const getMatch = (data: any) => {
  return get('/sports-api/v1/pc/matchList', data)
}
