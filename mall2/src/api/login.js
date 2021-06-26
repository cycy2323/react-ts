import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    dataType: "formData",
    data
  });
}

export function getInfo() {
  return request({
    url: "auth/info",
    method: "get"
  });
}

// export function getCodeImg() {
//   return request({
//     url: 'auth/code',
//     method: 'get'
//   })
// }

export function logout() {
  return request({
    url: "/logout",
    method: "get"
  });
}
