import React from 'react';
import history from '@/utils/history';

const User: React.FC = () => {
  const goIndex = () => {
    history.push('/');
  };

  return (
    <div>
      <p>我是个人中心</p>
      <a onClick={goIndex} style={{ color: 'blue' }}>
        跳去首页
      </a>
    </div>
  );
};

export default User;
