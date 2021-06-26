import React, { useState, useEffect, useRef } from 'react';

import live from '@/scss/live/live.scss'
import AllLiveList from './component/allLiveList'
import ExcitGame from './component/ExcitGame'

import { useDispatch, useSelector } from 'react-redux';
import { homeAction } from '@/actions';
import { RootState } from '@/reducers';


export default function Soccer() {
  const [init, setInit] = useState(true);
  const dispatch = useDispatch()
  const bottomData: any = useSelector((state: RootState) => state.home['bottomData'])
  const data: any = useSelector((state: RootState) => state.home['data'])

  const getHotNowLiveList = (index: number) => {
    dispatch({
      type: `home/${homeAction.GET_HOT_NOW_LIVE_LIST_EPIC}`,
      payload: {
        page: 1,
        size: 16,
        liveTypeId: index,
        ignoreRoomIds: data.rows.map((item: any) => item.room_id)
      }
    });
  }

  useEffect(() => {
    init && setInit(false)
    !init && getHotNowLiveList(1)
  }, [data.rows.length])

  console.log('直播足球',bottomData)
  const exculList = [1, 2, 3, 4];
  const [liIndex, setLiIndex] = useState(0);
  const HotLi = ['中超', '意甲', '德甲', '法甲', '欧冠', '欧联', '足总杯', 'K联赛', '亚冠'];

  return (
    <div>
      <div className={live.main}>
        <div className={live.liveright}>
          {/* 精彩比赛 */}
          <div className={live.excgame}>
            <p className={live.exctext}>精彩比赛</p>
            <div className={live.excmain}>
              <ul className={live.excul}>
                {
                  exculList.map((item, index) => {
                    return (<ExcitGame key={index} />)
                  })
                }
              </ul>
            </div>
          </div>

          {/* 全部 */}
          <div className={live.allqiu}>
            <div className={live.alltabs}>
              <p className={live.alltitle}>全部</p>
              <ul className={live.alltabs2}>
                {
                  HotLi.map((item, index) => {
                    return (
                      <li className={index === liIndex ? live.allaction2 : ''} key={index} onClick={() => { setLiIndex(index) }}>
                        <a>{item}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <ul className={live.letterUl}>
              {
                 bottomData && bottomData.rows && bottomData.rows.length && bottomData.rows.map((item: any, index: number) => {
                  return (<AllLiveList item={item} key={index} />)
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}