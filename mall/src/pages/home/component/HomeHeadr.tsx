import React, { useState, useEffect, useRef } from 'react';
import homehead from '@/scss/home/homeHeadr.scss';
import Player from '@/components/player'
import history from '@/utils/history';
// import Room from '@/pages/room/room';
import { useDispatch, useSelector } from 'react-redux';
import { homeAction } from '@/actions'
import { RootState } from '@/reducers';

// 导入组件
export default function HomeHeadr() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const dispatch = useDispatch()
  const data: any = useSelector((state: RootState) => state.home['data'])
  // top Live list
  useEffect(() => {
    dispatch({
      type: `home/${homeAction.GET_LIVE_LIST_EPIC}`,
      payload: { page: 1, size: 6, liveTypeId: 1 }
    });
  }, [])
  return (
    <div className={homehead.homeheadr}>
      <div className={homehead.homeplay}>
        <div className={homehead.playleft}>
          {/* onClick={() => history.push('/layout', { defaultPath: 'room/room', })}  */}
          <Player isHiddenChat={true} item={data.rows && data.rows.length && data.rows[activeIndex]} />
        </div>
        <div className={homehead.playright}>
          <ul className={homehead.playtab}>
            {data && data.rows && data.rows.length && data.rows.map((item: any, index: number) => {
              return (
                <li
                  className={index === activeIndex ? homehead.active : ''}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  <img
                    src={item.room_img || item.screenshot_url}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
