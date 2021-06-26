import React, { useState, useEffect } from 'react';

import hot from '@/scss/home/HotNow.scss';
import history from '@/utils/history';

import { useDispatch, useSelector } from 'react-redux';
import { homeAction } from '@/actions';
import { RootState } from '@/reducers';
import { url } from 'inspector';


export default function HotNow() {
  const [liIndex, setLiIndex] = useState(0);
  const [init, setInit] = useState(true);
  const HotLi = ['足球', '篮球', '电竞'];
  const dispatch = useDispatch()
  const bottomData: any = useSelector((state: RootState) => state.home['bottomData'])
  const data: any = useSelector((state: RootState) => state.home['data'])
  const interestingAnchor: any = useSelector((state: RootState) => state.home['interestingAnchor'])
  // const {bottomData, data, interestingAnchor} =useSelector((state: RootState) => state.home)
  // 正在热播Hot now

  const getHotNowLiveList = (index: number) => {
    dispatch({
      type: `home/${homeAction.GET_HOT_NOW_LIVE_LIST_EPIC}`,
      payload: {
        page: 1,
        size: 8,
        liveTypeId: index,
        ignoreRoomIds: data.rows.map((item: any) => item.room_id)
      }
    });
  }

  useEffect(() => {
    init && setInit(false)
    !init && getHotNowLiveList(1)
  }, [data.rows.length])

  console.log(bottomData)
  // 有趣主播
  useEffect(() => {
    dispatch({
      type: `home/${homeAction.GET_INTERESTING_ANCHOR_EPIC}`
    });
  }, []);
  const switchTab = (index: number) => {
    setLiIndex(index)
    getHotNowLiveList(index + 1)
  }
  return (
    <div className={hot.main}>
      <div className={hot.mainleft}>
        {/* tab切换 */}
        <div className={hot.eventtop}>
          <div className={hot.eventtopleft}>
            <div className={hot.eveniocn}></div>
            <p className={hot.eventitle}>正在热播</p>
            <ul className={hot.eventabs}>
              {
                HotLi.map((item, index) => {
                  return (
                    <li className={index === liIndex ? hot.action2 : ''} key={index} onClick={() => switchTab(index)}>
                      <a>{item}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <p className={hot.chakan} onClick={() => history.push('/live', { defaultPath: 'live-list/all', })}>
            查看全部<span></span>
          </p>
        </div>
        {/* tab切换内容区 */}
        <ul className={hot.contnul}>
          {
            bottomData && bottomData.rows && bottomData.rows.length && bottomData.rows.map((item: any, index: number) => {
              return (<HoTablist item={item} key={index} />)
            })
          }
        </ul>
      </div>
      <div className={hot.mainright}>
        <div className={hot.title}>
          <span className={hot.titleimg}></span>有趣的主播
        </div>
        <ul className={hot.zhubo}>
          {interestingAnchor && interestingAnchor.length && interestingAnchor.map((itme: any, index: number) => {
            return <Zhubolist key={index} item={itme} />;
          })}
        </ul>
      </div>
    </div >
  );
}

const HoTablist = (props: any) => {
  const { item } = props
  return (
    <li onClick={() => history.push('/layout', { defaultPath: 'room/room', item: item })}>
      <div className={hot.images} style={{ background: `url(${item.room_img || item.screenshot_url})` }}>
        <img
          className={hot.play}
          src='https://cdn.qiuhui.com/static/images/6d9ac27c.png'
        />
        <div className={hot.steam}>
          <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={hot.steamplay} />
        </div>
      </div>
      <p className={hot.ouzhoubei}>{item.title}</p>
      <div className={hot.people}>
        <div className={hot.name}>
          <span className={hot.touxiang}></span>{item.nickname}
        </div>
        <div className={hot.nubmer}>
          <span className={hot.hotimg}></span>{item.heat}
        </div>
      </div>
    </li>
  );
}
const Zhubolist = (props: any) => {
  return (
    <li>
      <div className={hot.zhuboimg}>
        <div className={hot.zhubotou} style={{ background: `url(${props.item.user_img})` }}></div>
        <span className={hot.zhubohot}>
          <img src='http://222.186.150.148:8001/static/images/home/steam.gif' className={hot.steamplay} />
        </span>
      </div>
      <div className={hot.text}>
        <p className={hot.text1}>{props.item.nickname}</p>
        <span className={hot.text2}>{props.item.introduction}</span>
      </div>
    </li>
  );
};
