import React, { useState, useEffect, useRef } from 'react';
import feixi from './title.scss';

const Title = () => {
  return (
    <div className={feixi.topbj}>
      <div className={feixi.titlewarp}>
        <div className={feixi.lefttit}>
          <div className={feixi.leftimg}>
            <img src='http://222.186.150.148:8001/static/images/room/logo1.webp' className={feixi.imgL1} />
          </div>
          <div className={feixi.lefttext}>
            大田市民<span className={feixi.zoo}>0</span>
          </div>
        </div>
        <div className={feixi.leftcent}>
          <p>未开赛</p>
          <p className={feixi.dateing}><span className={feixi.textbxj}>巴西甲</span>2020/09/10</p>
          <p className={feixi.banchan}>半场：<span>0-1</span></p>
        </div>
        <div className={feixi.lefttit}>
          <div className={feixi.lefttext}>
            <span className={feixi.zoo2}>0</span>浦项制铁
              </div>
          <div className={feixi.rightimg}>
            <img src='http://222.186.150.148:8001/static/images/room/logo2.webp' className={feixi.imgR1} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Title