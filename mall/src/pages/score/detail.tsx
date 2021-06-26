import React, { useState, useEffect, useRef, lazy } from 'react';

import Nav from '@/components/nav';
import Title from '@/components/biFeiTitle'

import feixi from '@/scss/score/feixi.scss';
import { Route } from 'react-router-dom';

export default function Feixi() {
  const tabnav = [
    { tabName: '数据', id: 0, path: 'detail/feixi' },
    { tabName: '欧洲', id: 1, path: 'detail/zoushi' },
    { tabName: '让球', id: 2, path: 'detail/rangqiu' },
    { tabName: '大小', id: 3, path: 'detail/daxiao' },
    { tabName: '三合一', id: 4, path: 'detail/sanheyi' },
    { tabName: '直播', id: 5, path: 'detail/lives' }
  ];
  const [currIndex, setCurrIndex] = useState(0);
  const [path, setPath] = useState<string>('detail/feixi');
  const tabChoiced = ((arr) => {
    // console.log(arr)
    setCurrIndex(arr.id);
    setPath(arr.path);
  });
  return (
    <div>
      <Nav />
      <div className={feixi.main11}>
        <Title />
        <div className={feixi.navctn}>
          <ul className={feixi.navs}>
            {
              tabnav.map((item, index) => {
                return (
                  <li
                    className={`${feixi.navsli} ${index === currIndex ? feixi.active : ''}`}
                    key={index}
                    onClick={() => { tabChoiced(item); }}
                  >
                    <span className={feixi.text}>{item.tabName}</span>
                  </li>
                );
              })
            }
          </ul>
        </div>
        {/* 切换块 */}
        <div className={feixi.wrapper}>
          <Route
            component={lazy(() =>
              import(/* webpackChunkName: "all" */ `@/pages/score/${path}`)
            )}
          />
        </div>

      </div>
    </div>
  )
}

