import React, { useState, useEffect } from 'react';
import homeeve from '@/scss/home/HomeEvents.scss';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { scoreAction } from '@/actions';
import history from '@/utils/history';

import '@/scss/home/swiperReset.css'

// install Swiper components
SwiperCore.use([Navigation, Pagination]);

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import { RootState } from '@/reducers';
import { time } from '@/utils/regular';

export default function HomeEvents() {
  const dispatch = useDispatch();


  // 预告类型 1 即将开始 2 五大联赛 3 一级赛事

  const evenLi = ['即将开始', '五大联赛', '一级联赛'];
  const [liIndex, setLiIndex] = useState(0);
  const previewList: any = useSelector((state: RootState) => state.score['previewList'])

  const getHotNowLiveList = (index: number) => {
    dispatch({
      type: `score/${scoreAction.GET_TOURNAMENT_PREVIEW}`,
      payload: {
        type: index
      }
    });
  }
  useEffect(() => {
    getHotNowLiveList(1)
  }, [])
  const switchTab = (index: number) => {
    setLiIndex(index)
    getHotNowLiveList(index + 1)
  }

  return (
    <div className={homeeve.eventctn}>
      <div className={homeeve.eventtop}>
        <div className={homeeve.eventtopleft}>
          <div className={homeeve.eveniocn}></div>
          <p className={homeeve.eventitle}>赛事预告</p>
          <ul className={homeeve.eventabs}>
            {evenLi.map((itme, index) => {
              return (
                <li className={index === liIndex ? homeeve.action2 : ''} key={index} onClick={() => switchTab(index)}>
                  <a>{itme}</a>
                </li>
              )
            })
            }
          </ul>
        </div>
        <p className={homeeve.chakan} onClick={() => history.push('/layout', { defaultPath: 'all-matches/all', })}>
          查看全部<span></span>
        </p>
      </div>
      <div className={homeeve.main}>
        <div className='swiper-cont'>
          <div className='swiperXin'>
            <Swiper style={{ width: '100%', height: '100%' }}
              spaceBetween={12}
              slidesPerView={5}
              navigation
            // pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('')}
            >
              {
                previewList.map((item: any, index: number) => {
                  return (<SwiperSlide key={index} ><Mainli item={item && item} /></SwiperSlide>)
                })
              }
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}


const Mainli = (props: any) => {
  return (<li className={homeeve.mainli}>
    <div className={homeeve.maintitle}>
      <span className={homeeve.text}>{props.item[6]}</span>
      <span className={homeeve.textright}>{time(props.item[1])}</span>
    </div>
    <div className={homeeve.mainctn}>
      <div className={homeeve.left}>
        <img
          src={props.item[3]}
          className={homeeve.eveimg}
        />
        <p className={homeeve.text}>{props.item[2]}</p>
      </div>
      <p className={homeeve.vs}>VS</p>
      <div className={homeeve.right}>
        <img
          src={props.item[5]}
          className={homeeve.eveimg2}
        />
        <p className={homeeve.text}>{props.item[4]}</p>
      </div>
    </div>
  </li>
  );
}
