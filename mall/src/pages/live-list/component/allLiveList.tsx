import React, { useState, useEffect, useRef } from 'react';

import live from '@/scss/live/live.scss'
import history from '@/utils/history';

export default function AllLiveList(props: any) {
  const { item } = props;
  return (
    <li className={live.lis} onClick={() => history.push('/layout', { defaultPath: 'room/room', })}>
      <div className={live.images} style={{ background: `url(${item.room_img || item.screenshot_url})` }}>
        <img
          className={live.play}
          src='https://cdn.qiuhui.com/static/images/6d9ac27c.png'
        />
        <div className={live.steam}>
          <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={live.steamplay} />
          <span className={live.steamtext}>LIVE</span>
        </div>
      </div>
      <div className={live.qiugame}>
        <div className={live.qiugametitle}><span>中甲</span></div>
        <p className={live.qiugamename}>{item.title}</p>
      </div>
      <div className={live.people}>
        <div className={live.name}>
          <span className={live.touxiang}></span>{item.nickname}
        </div>
        <div className={live.nubmer}>
          <span className={live.hotimg}></span>{item.heat}
          <p className={live.qiubiaosi}>足球</p>
        </div>
      </div>
    </li>

  )
}