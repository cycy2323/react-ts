import request from "@/utils/request";

//视频列表
export function videoList(data) {
  return request({
    url: "/videoManage/videoList",
    method: "post",
    dataType: "formData",
    data
  });
}
//视频列表删除
export function delVideo(data) {
  return request({
    url: "/videoManage/delVideo",
    method: "post",
    dataType: "formData",
    data
  });
}

//获取视频类型
export function getVideoMetaInfo(params) {
  return request({
    url: "/videoManage/selectVideoMetaInfo",
    method: "post",
    // dataType: 'formData',
    params
  });
}
//获取视频时间类型
export function getTimeValue(params) {
  return request({
    url: "/videoManage/getTimeValue",
    method: "get",
    dataType: "formData",
    params
  });
}
//官方昵称下拉框
export function optionList(params) {
  return request({
    url: "/activity/nickname/optionList",
    method: "get",
    dataType: "formData",
    params
  });
}
//转码数量
export function getTransCodeNum() {
  return request({
    url: "/videoManage/transcoderCount",
    method: "get"
  });
}
//转码
export function setTranscoder(data) {
  return request({
    url: "/videoManage/transcoder",
    method: "post",
    dataType: "formData",
    data
  });
}
//视频审核
export function checkVideo(data) {
  return request({
    url: "/videoManage/checkVideo",
    method: "post",
    dataType: "formData",
    data
  });
}
