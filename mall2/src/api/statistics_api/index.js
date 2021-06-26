import request from "@/utils/request";

//   用户统计
export function getUserStatistics(data) {
  return request({
    url: "/statistics/userStatistics",
    method: "get",
    params: data
  });
}
// 折现统计
export function getDiscountStatistics(data) {
  return request({
    url: "/statistics/discountStatistics",
    method: "get",
    params: data
  });
}

// top 统计
export function getAnnularStatistics(data) {
  return request({
    url: "/statistics/annularStatistics",
    method: "get",
    params: data
  });
}
// 在线用户统计
export function onlineStatistics(params) {
  return request({
    url: "/statistics/onlineStatistics",
    method: "get",
    params
  });
}
