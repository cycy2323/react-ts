import request from "@/utils/request";

//官方昵称设置列表
export function getList(params) {
  return request({
    url: "/activity/nickname/getList",
    method: "get",
    dataType: "formData",
    params
  });
}
//图片上传
export function adevImg(data) {
  return request({
    url: "/adInfo/uploadImage",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data
  });
}
// 修改官方昵称
export function update(data) {
  return request({
    url: "/activity/nickname/update",
    method: "post",
    dataType: "formData",
    data
  });
}
// 新增官方昵称
export function add(data) {
  return request({
    url: "/activity/nickname/add",
    method: "post",
    dataType: "formData",
    data
  });
}
// 删除官方昵称
export function deles(data) {
  return request({
    url: "/activity/nickname/del",
    method: "post",
    dataType: "formData",
    data
  });
}
