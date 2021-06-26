import { post, get } from '@/utils/require';
/**
 * 获取login信息接口
 */
export const getLogin = (data: any) => {
  return post('/live-passport-api/user/login', data)
}

/**
 * 获取注册时图形验证码
 */
export const getRandCode = () => {
  return get('/live-passport-api/user/randCode')
}


/**
 * 获取注册时图形验证码
 */
export const getRegister = (data: any) => {
  return post('/live-passport-api/user/register', data)
}


/**
 * 获取注册code信息接口
 */
export const getCode = (data: any) => {
  return post('/live-passport-api/user/sendSmsCode', data)
}

/**
 * 查询用户信息接口
 */
export const getUserInfo = (data: any) => {
  return get('/live-passport-api/user/getUserInfoById', data)
}

/**
 * 绑定手机号接口
 */
export const bindPhone = (data: any) => {
  return post('/live-passport-api/user/bindPhone', data)
}

/**
 * 修改密码接口
 */
export const changePassword = (data: any) => {
  return post('/live-passport-api/user/changePassword', data)
}

/**
 * 查询用户关注主播接口
 */
export const updateFieldLevel = (data: any) => {
  return get('/live-passport-api/user/updateFieldLevel', data)
}

/**
 * 更新用户字段接口
 */
export const updatePublicField = (data: any) => {
  return get('/live-passport-api/user/updatePublicField', data)
}




