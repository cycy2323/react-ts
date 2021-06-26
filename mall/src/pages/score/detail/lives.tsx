import React, { useState, useEffect, useRef } from 'react';

import feixi from '@/scss/score/feixi.scss';
import Chats from '@/components/chats';
interface Props {
  item: [{ [name: string]: any }]
}
export default function Feixi(props: Props) {
  const item = {
    head_image: "http://www.doudong888.com/cloud-ulive-test//IMAGES/app-user/headimg/user07%403x.png?version=1",
    heat: 0,
    live_type_id: 1,
    match_id: null,
    nickname: "苏晟睿088",
    playAddr: [{
      playUrl: "http://liveplay.yikating.net/live/100037.flv?txSecret=6da2b26a986cec760e6723d677a686e8&txTime=5FC5F679",
      protocolType: "flv"
    }],
    room_id: 100037,
    room_img: "http://www.doudong888.com/cloud-ulive-test//IMAGES/football/football01%403x.png?version=1",
    screenshot_url: "http://screenshot-1301289110.cos.ap-beijing.myqcloud.com//100037-screenshot-14-50-20-1280x720.jpg",
    source_type: [],
    status: 1,
    title: "大家好，欢迎来到我的直播间！",
  }
  return (
    <div>
      <div className={feixi.lishi}>
        <Chats item={item} />
      </div>
    </div>
  )
}