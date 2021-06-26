import request from "@/utils/request";

//消息列表
export function messageList(params) {
  return request({
    url: "/messageInfo/messageList",
    dataType: "formData",
    method: "get",
    params
  });
}
//删除消息
export function messageDelete(params) {
  return request({
    url: "/messageInfo/delete",
    dataType: "formData",
    method: "post",
    params
  });
}
