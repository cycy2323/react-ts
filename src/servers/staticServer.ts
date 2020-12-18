import { get } from '@/utils/require';

/**
 * 获取preinfo信息接口
 */
export const getPreInfo = () => {
  return get('/static/v1/pre_info');
};
