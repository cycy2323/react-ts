import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '@/utils/history';
import homeStyle from '@/scss/home.scss';
import { staticAction } from '@/actions';
import { RootState } from '@/reducers';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const staticStore = useSelector((state: RootState) => state.statics);
  const time = useRef<any>();
  const [count, setCount] = useState<number>(0);

  const goUser = () => {
    history.push('/user');
  };

  useEffect(() => {
    // 调用preinfo接口
    dispatch({
      type: `static/${staticAction.GET_PREINFO_EPIC}`
    });
  }, []);

  useEffect(() => {
    // 开启一个定时任务
    time.current = setInterval(() => {
      setCount(count + 1);
      console.log(count);
    }, 3000);

    // 清除副作用
    return () => {
      clearInterval(time.current);
    };
  }, [count]);

  useEffect(() => {
    console.log(staticStore);
  }, []);

  return (
    <div>
      <p>我是首页</p>
      <p>当前计数：{count}</p>
      <a onClick={goUser} className={homeStyle.btn}>
        跳去个人中心
      </a>
      <div>
        <img
          src={
            'https://static.0am08m.com//prod/banner/4ce4b82f28ca81ff3ff7bd7f97ffbc04202085d7.png'
          }
          width={1200}
        />
      </div>
      <div className={homeStyle.bg}></div>
    </div>
  );
};

export default Home;
