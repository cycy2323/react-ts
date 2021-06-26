import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '@/utils/history';
import homeStyle from '@/scss/home/home.scss';
import { staticAction, userAction } from '@/actions';
import { RootState } from '@/reducers';
import Nav from '@/components/nav'
import HomeHeadr from './component/HomeHeadr'
import HomeEvents from './component/HomeEvents'
import HotNow from './component/HotNow'
import Recommend from './component/recommend'
import Information from './component/information'
import Footer from '@/components/footer'
import RightFix from '@/components/rightFix'


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const staticStore = useSelector((state: RootState) => state.statics);
  const time = useRef<any>();
  const [count, setCount] = useState<number>(0);

  const goUser = () => {
    history.push('/user');
  };
  const goRoom = () => {
    history.push('/room');
  };



  // useEffect(() => {
  //   // 调用preinfo接口
  //   dispatch({
  //     type: `static/${staticAction.GET_PREINFO_EPIC}`
  //   });
  // }, []);


  // useEffect(() => {
  //   // 调用登录接口
  //   dispatch({
  //     type: `user/${userAction.GET_LOGIN_EPIC}`,
  //     payload: { userName: 'admin', passWord: '123456' }
  //   });
  // }, []);

  // useEffect(() => {
  //   // 开启一个定时任务
  //   time.current = setInterval(() => {
  //     setCount(count + 1);
  //     // console.log(count);
  //   }, 3000);

  //   // 清除副作用
  //   return () => {
  //     clearInterval(time.current);
  //   };
  // }, [count]);

  useEffect(() => {
    // console.log(staticStore);
  }, []);

  return (
    <div>
      <Nav isHome={true} />
      <HomeHeadr />
      <div className={homeStyle.content}>
        <HomeEvents />
        <HotNow />
        {/* <Recommend /> */}
        <img src={'http://222.186.150.148:8001/static/images/home/advertising.webp'} alt='' />
        <Information />
      </div>
      <Footer />
      <RightFix />


      {/* <p>我是首页</p>
      <p>当前计数：{count}</p>
      <div className={homeStyle.networkImg}></div>
      <a onClick={goUser} className={homeStyle.btn}>
        跳去个人中心
      </a>
      <p onClick={goRoom} className={homeStyle.btn}>
        跳去直播房间
      </p>
      <div>
        <img
          src={
            'https://static.0am08m.com//prod/banner/4ce4b82f28ca81ff3ff7bd7f97ffbc04202085d7.png'
          }
          width={1200}
        />
      </div> */}
    </div>
  );
};

export default Home;
