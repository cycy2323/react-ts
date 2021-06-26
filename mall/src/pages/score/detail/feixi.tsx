import React, { useState, useEffect, useRef } from 'react';

import feixi from '@/scss/score/feixi.scss';
import Select from '@/components/Selects'

export default function Feixi () {
  const lsjiaofen = [1,2,3,4,5,6,7,8,9];
  return(
    <div>
      <div className={feixi.lishi}>
        <p className={feixi.lstext}>历史交锋222</p>
        <div className={feixi.lsctn}>
          <div className={feixi.lstop}>
            <div className={feixi.lsall}>全部赛事</div>
            <p className={feixi.zkxtxx}><span className={feixi.zkxt}></span>主客相同</p>
            <div className={feixi.lsdown}> <Select dataSelect/></div>
            <div className={feixi.lsqiu}>球会友谊<span className={feixi.lsgou}></span></div>
            <div className={`${feixi.lsqiu} ${feixi.lsqiu2}`}>球会友谊<span className={feixi.lsgou}></span></div>
            <div className={`${feixi.lsqiu} ${feixi.lsqiu2}`}>球会友谊<span className={feixi.lsgou}></span></div>
          </div>
          <ul className={feixi.title1}>
            <li className={feixi.ell1}>比赛</li>
            <li className={feixi.ell2}>比赛日期</li>
            <li className={feixi.ell3}>主场球队比分客场球队</li>
            <li className={feixi.ell4}>半场</li>
            <li className={feixi.ell5}>角球</li>
            <li className={feixi.ell6}>胜负</li>
            <li className={feixi.ell7}>胜负</li>
            <li className={feixi.ell8}>让球</li>
            <li className={feixi.ell9}>走势</li>
            <li className={feixi.ell10}>进球数</li>
          </ul>
          <ul className={feixi.lslist}>
            {/* 历史交锋 */}
            {lsjiaofen.map((item, index) => {
              return (<Lishijiaofen key={index} />)
            })}
          </ul>
          <div className={feixi.lsfooter}>
            近5场交锋，胜出<span className={feixi.red}>1</span>场，平局<span>0</span>场，
            输<span  className={feixi.blue}>4</span>场；
            近5场开盘，<span className={feixi.red}>1</span>赢<span className={feixi.blue}>0</span>走<span className={feixi.grren}>4</span>输；
            其中，<span className={feixi.red}>2</span>场为打球，<span className={feixi.grren}>2</span>场为小球
          </div>
        </div>
      </div>
      <div className={feixi.lishi}>
        <p className={feixi.lstext}>近期战绩</p>
        <div className={feixi.lsctn}>
          <div className={feixi.lstop}>
            <div className={feixi.gamedatiansm}><img src='http://172.24.135.230/images/score/logo1.webp' className={feixi.daimg}></img>大田市民</div>
            <div className={feixi.lsdown}> <Select dataSelect/></div>
            <div className={feixi.lsqiu}>球会友谊<span className={feixi.lsgou}></span></div>
            <div className={`${feixi.lsqiu} ${feixi.lsqiu2}`}>球会友谊<span className={feixi.lsgou}></span></div>
            <div className={`${feixi.lsqiu} ${feixi.lsqiu2}`}>球会友谊<span className={feixi.lsgou}></span></div>
          </div>
          <ul className={feixi.title1}>
            <li className={feixi.ell1}>比赛</li>
            <li className={feixi.ell2}>比赛日期</li>
            <li className={feixi.ell3}>主场球队比分客场球队</li>
            <li className={feixi.ell4}>半场</li>
            <li className={feixi.ell5}>角球</li>
            <li className={feixi.ell6}>胜负</li>
            <li className={feixi.ell7}>胜负</li>
            <li className={feixi.ell8}>让球</li>
            <li className={feixi.ell9}>走势</li>
            <li className={feixi.ell10}>进球数</li>
          </ul>
          <ul className={feixi.lslist}>
            {/* 近期战绩 */}
            {lsjiaofen.map((item, index) => {
              return (<Lishijiaofen key={index} />)
            })}
          </ul>
          <div className={feixi.lsfooter}>
            近5场交锋，胜出<span className={feixi.red}>1</span>场，平局<span>0</span>场，
            输<span  className={feixi.blue}>4</span>场；
            近5场开盘，<span className={feixi.red}>1</span>赢<span className={feixi.blue}>0</span>走<span className={feixi.grren}>4</span>输；
            其中，<span className={feixi.red}>2</span>场为打球，<span className={feixi.grren}>2</span>场为小球
          </div>
        </div>

      </div>
    </div>
  )
}

const Lishijiaofen = () => {
  return (
    <>
      <li className={feixi.lslistli}>
              <p className={feixi.lil1}>西甲</p>
              <div className={feixi.lil2}>2019-09-09</div>
              <div className={feixi.lil3}>
                <span>鹿特丹斯巴达</span><span className={feixi.lilbifei}>0-4</span><span>海伦芬</span>
              </div>
              <div className={feixi.lil4}>
                <p className={feixi.lilban}>2-0</p>
              </div>
              <p className={feixi.lil5}>1-1</p>
              <p className={`${feixi.lil6} ${feixi.red}`}>胜</p>
              <div className={feixi.lil7}>
                <span>3.22</span><span className={feixi.lilsf}>3.4</span><span>2.88</span>
              </div>
              <div className={feixi.lil8}>
                <span>3.22</span><span className={feixi.lilsf}>3.4</span><span>2.88</span>
              </div>
              <p className={`${feixi.lil9} ${feixi.green}`}>输</p>
              <p className={`${feixi.lil10} ${feixi.green}`}>小</p>
            </li>
    </>
  )
}