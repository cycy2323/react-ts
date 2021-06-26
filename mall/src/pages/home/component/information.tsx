import React, { useState, useEffect } from 'react';

import style from '@/scss/home/information.scss';

export default function HotNow() {
  const zixunList = [1, 2, 3, 4, 5,6];
  return (
    <div className={style.main}>
      <div className={style.mainleft}>
        {/* 最新情报 */}
        <div className={style.eventtop}>
            <div className={style.eveniocnleft} ></div>
            <p className={style.eventitle}>最新情报</p>
        </div>
        <div className={style.newctn}>
          <div className={style.newimg}></div>
        </div>
      </div>
      <div className={style.mainmoide}>
        {/* 中间新闻 */}
        <div className={style.xinwen}>
          <span className={style.tupian}></span>
          <div className={style.xinwenright}>
            <p className={style.xintitle}>拜仁官方：齐尔克泽新冠检测呈阳性 聚勒第二次检测为阴性</p>
            <div className={style.xinctn}>拜仁官方确认，小将齐尔克特在新冠检测中呈阳性，状态良好，目前居家隔离。</div>
          </div>
        </div>
        <div className={style.xinwen}>
          <span className={style.tupian}></span>
          <div className={style.xinwenright}>
            <p className={style.xintitle}>拜仁官方：齐尔克泽新冠检测呈阳性 聚勒第二次检测为阴性</p>
            <div className={style.xinctn}>拜仁官方确认，小将齐尔克特在新冠检测中呈阳性，状态良好，目前居家隔离。</div>
          </div>
        </div>
      </div>
      <div className={style.mainright}>
        {/* 热门资讯 */}
        <div className={style.eventtop}>
            <div className={style.eveniocnright} ></div>
            <p className={style.eventitle}>热门资讯</p>
        </div>
        <div className={style.zixun}>
          <div className={style.zixuntop}>
            <p className={style.zixuntitle}>20055期传统14场：热刺力争主场首胜… </p>
            <p className={style.zixunctn}>
              20055期传统14场足彩由英超、德甲、意
              甲和西甲等四大联赛构成，销售日期截止
              今天19:30分，以下是本期足彩看点及预…</p>
          </div>
          <ul className={style.zixunul}>
            { zixunList.map((item, index) =>{
              return (<li key={index}><p className={style.zixunList}>k1联赛争冠组：全北现代四连冠，蔚山…</p><span className={style.zixunub}>23273</span></li>)
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
