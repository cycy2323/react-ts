import request from "@/utils/request";

//用户管理列表
export function getQueryUserList(params) {
  return request({
    url: "/userList/queryUserList",
    method: "get",
    dataType: "formData",
    params
  });
}

// 删除用户
export function deleteUser(data) {
  return request({
    url: "/userList/delete",
    method: "post",
    dataType: "formData",
    data
  });
}

// 修改解、封杀
export function editUpdateStatus(data) {
  return request({
    url: "/userList/updateStatus",
    method: "post",
    dataType: "formData",
    data
  });
}
// 获取用户详情
export function userDetailsInfo(params) {
  return request({
    url: "/userList/UserInfo",
    method: "get",
    dataType: "formData",
    params
  });
}
// 获取权限详情
export function userPermissionList(params) {
  return request({
    url: "/userList/PermissionInfo",
    method: "get",
    dataType: "formData",
    params
  });
}
//用户视频列表
export function userVideoList(params) {
  return request({
    url: "/userList/UserVideoList",
    method: "get",
    dataType: "formData",
    params
  });
}
//登录日志列表
export function userLoginLog(params) {
  return request({
    url: "/userList/queryLoginLog",
    method: "get",
    dataType: "formData",
    params
  });
}
