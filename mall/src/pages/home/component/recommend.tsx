import React, { useState, useEffect } from 'react';

import style from '@/scss/home/recommend.scss';

export default function Recommend() {
  const contnUl = [1, 2, 3, 4, 5];

  return (
    <div className={style.main}>
      <div className={style.mainleft}>
        {/* tab切换 */}
        <div className={style.eventtop}>
          <div className={style.eventtopleft}>
            <div className={style.eveniocn} ></div>
            <p className={style.eventitle}>精彩推荐</p>
          </div>
          <p className={style.chakan}>
            查看全部<span></span>
          </p>
        </div>
        {/* tab切换内容区 */}
        <ul className={style.contnul}>
          {
            contnUl.map((item, index) => {
              return (
                <li key={index}>
                  <div className={style.images}>
                    <img
                      className={style.play}
                      src={'https://cdn.qiuhui.com/static/images/6d9ac27c.png'}
                    />
                    <div className={style.steam}>
                      <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={style.steamplay} />
                    </div>
                  </div>
                  <p className={style.ouzhoubei}>欧洲杯 拉齐奥VS尤文图斯</p>
                  <div className={style.people}>
                    <div className={style.name}>
                      <span className={style.touxiang}></span>小明酱
                    </div>
                    <div className={style.nubmer}>
                      <span className={style.hotimg}></span>1912
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}
