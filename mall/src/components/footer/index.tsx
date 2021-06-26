import React, { useState, useEffect } from 'react';

import footer from './footer.scss';

export default function Footer() {
  return (
    <div className={footer.ctn}>
      <div className={footer.main}>
        <img className={footer.logo} src={'http://222.186.150.148:8001/static/images/home/logo.webp'} alt={'logo'} />
        <div className={footer.ultabctn}>
          <ul className={footer.zhibo}>
            <li>直播</li>
            <li>看足球</li>
            <li>看篮球</li>
            <li>看电竞</li>
          </ul>
          <ul className={footer.zhibo}>
            <li>赛事</li>
            <li>足球比赛</li>
            <li>篮球比赛</li>
            <li>电竞比赛</li>
          </ul>
          <ul className={footer.zhibo}>
            <li className={footer.yuc}>预测</li>
            <li>找专家</li>
            <li>按比赛</li>
            <li>电竞比赛</li>
          </ul>
          <ul className={footer.zhibo2}>
            <li>新闻</li>
            <li>足球</li>
            <li>篮球</li>
            <li>电竞</li>
          </ul>
        </div>
        <div className={footer.codectn}>
          <div className={footer.codeleft}>
            <p className={footer.xiazai}>下载U球APP</p>
            <ul className={footer.phone}>
              <li><span className={footer.iphoneicon}></span>iphone版</li>
              <li><span className={footer.androidicon}></span>Android版</li>
            </ul>
          </div>
          <div className={footer.coderight}>
            <div className={footer.codecc}></div>
          </div>
        </div>
      </div>
    </div>
  )

}