import React, { useState, useEffect, useRef } from 'react';

import wanch from '@/scss/score/football/wanchang.scss';

export default function Saicheng() {
  const dataLi = [
    { date: '11/15', week: '周一' },
    { date: '11/15', week: '周一' },
    { date: '11/15', week: '周一' },
    { date: '11/15', week: '周一' },
    { date: '11/15', week: '周一' },
    { date: '11/15', week: '周一' },
    { date: '11/15', week: '周一' }
  ];
  const [dataLis, setDataLis] = useState(1);
  const list11 = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20, 21, 22, 23, 24, 25
  ];
  return (
    <div className={wanch.saicheng}>
      <div className={wanch.fixed}>
        <div className={wanch.rilitop}>
          <div className={wanch.rilictn}>
            <span className={wanch.tubiao}></span>日历
            <span className={wanch.xiadown}></span>
          </div>
          <ul className={wanch.rili}>
            {dataLi.map((item, index) => {
              return (
                <li
                  className={`${wanch.rililis} ${dataLis === index ? wanch.actives : ''
                    }`}
                  key={index}
                  onClick={() => {
                    setDataLis(index);
                  }}
                >
                  <p className={wanch.rilidata}>{item.date}</p>
                  <span>{item.week}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={wanch.listheader}>
          <ul className={wanch.listtop33}>
            <li className={`${wanch.cl} ${wanch.cl1}`}>编号</li>
            <li className={`${wanch.cl} ${wanch.cl2}`}>比赛</li>
            <li className={`${wanch.cl} ${wanch.cl3}`}>轮次</li>
            <li className={`${wanch.cl} ${wanch.cl4}`}>比赛时间</li>
            <li className={`${wanch.cl} ${wanch.cl5}`}>
              主场球队比分客场球队
          </li>
            <li className={`${wanch.cl} ${wanch.cl6}`}>让球</li>
            <li className={`${wanch.cl} ${wanch.cl7}`}>技术统计</li>
            <li className={`${wanch.cl} ${wanch.cl8}`}>操作</li>
            <li className={`${wanch.cl} ${wanch.cl9}`}>比赛</li>
          </ul>
        </div>
      </div>
      <div className={wanch.loading}>
        <div className={wanch.wraper1}>
          <ul className={wanch.ulbody}>
            {list11.map((item, index) => {
              return (<Ligames key={index} />)
            })}

          </ul>

        </div>
      </div>
    </div>
  )
}

const Ligames = () => {
  const isLive = false;
  return (
    <li className={wanch.saichen}>
      <p className={wanch.sai1}>
        01
      </p>
      <div className={wanch.sai2}>
        <span className={wanch.xjicon}></span>西甲
      </div>
      <p className={wanch.sai3}>第12轮</p>
      <div className={wanch.sai4}>
        00:00
      </div>
      <p className={wanch.sai5}>鹿特丹斯巴达-海伦芬</p>
      <div className={wanch.sai6}>
        <span className={wanch.bang}>0.5</span>
      </div>
      <p className={wanch.sai7}>
        <span className={wanch.nubtext}>1-1</span>
      </p>
      <p className={wanch.sai8}><span className={wanch.caozuo}></span></p>
      <div className={wanch.sai9}>
        {isLive ?
          <div className={wanch.steam1}>
            <img
              src='http://222.186.150.148:8001/static/images/home/steam.gif'
              className={wanch.steam2}
            />
            <span className={wanch.steam3}>LIVE</span>
          </div>
          :
          <a className={wanch.bisai1}></a>
        }

      </div>

    </li>
  );
};