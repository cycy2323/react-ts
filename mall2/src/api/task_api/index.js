import request from "@/utils/request";

// 斗币设置列表
export function setDoubiList(data) {
  return request({
    url: "/activity/setList?" + data,
    method: "get"
  });
}

// 斗币修改
export function setUpdate(data) {
  return request({
    url: "/activity/setUpdate",
    method: "post",
    params: data
  });
}
