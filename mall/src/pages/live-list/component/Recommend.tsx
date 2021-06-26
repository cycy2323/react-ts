import React, { useState, useEffect, useRef } from 'react';
import live from '@/scss/live/live.scss'

// 精彩推荐
export default function Recommend() {
  return (
    <li className={live.lis}>
      <div className={live.images}>
        <img
          className={live.play}
          src='https://cdn.qiuhui.com/static/images/6d9ac27c.png'
        />
        <div className={live.steam}>
          <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={live.steamplay} />
          <span className={live.steamtext}>LIVE</span>
        </div>
      </div>
      <p className={live.ouzhoubei}>欧洲杯 拉齐奥VS尤文图斯</p>
      <div className={live.people}>
        <div className={live.name}>
          <span className={live.touxiang}></span>小明酱
        </div>
        <div className={live.nubmer}>
          <span className={live.hotimg}></span>1912
        </div>
      </div>
    </li>
  )
}