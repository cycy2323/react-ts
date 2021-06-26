import React, { useState, useEffect, useRef } from 'react';

import live from '@/scss/live/live.scss'
import history from '@/utils/history';

// 精彩比赛组件
export default function ExcitGame() {
  const [btnstat, setBtnstat] = useState(true)
  return (<li className={live.mainli}>
    <div className={live.maintitle}>
      <span className={live.text}>西甲</span>
      <span className={live.textcenten}>进行中</span>
      <span className={live.textright}>直播中</span>
    </div>
    <div className={live.mainctn}>
      <div className={live.left}>
        <img
          src={
            'http://222.186.150.148:8001/static/images/home/notice-card-left-icon.webp'
          }
          className={live.eveimg}
        />
        <p className={live.text}>河北华夏幸福</p>
      </div>
      <div className={live.exctwrap}>
        <p className={live.vs}>VS</p>
        <div className={live.exctBtn}>
          <button style={{ display: btnstat === true ? 'block' : 'none' }} className={live.exctBtn11}>
            <span className={live.exctBtniocn1}></span><span className={live.yuding}>预定</span>
          </button>
          <button style={{ display: btnstat === false ? 'block' : 'none' }} className={live.exctBtn22}>
            <span className={live.exctBtniocn2}></span><span className={live.zhibozhong}>直播中</span>
          </button>
        </div>
      </div>
      <div className={live.right}>
        <img
          src={
            'http://222.186.150.148:8001/static/images/home/notice-card-right-icon.webp'
          }
          className={live.eveimg2}
        />
        <p className={live.text}>河北华夏幸福</p>
      </div>
    </div>
  </li>
  );
}