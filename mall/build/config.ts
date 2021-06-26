// 启动端口
export const PORT: number = 7001

// 跨域代理
export const proxyURI = {
  '/static': 'http://web.hou2008.com',
  '/live-api': 'http://222.186.152.65:8001', // 直播
  '/live-passport-api': 'http://222.186.152.65:8001', // 登录注册个人中心
  '/sports-api': 'http://222.186.152.65:8001', // 比分
}
// http://222.186.150.148:12000/live-api/v1.2/rooms/pc?page=1&size=6&liveTypeId=1