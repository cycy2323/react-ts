import React from 'react';
import Header from '@/components/nav';
import Footer from '@/components/footer'
import UserInfo from './userInfo';

const User: React.FC = () => {
  return (
    <>
      <Header />
      <UserInfo />
      <Footer />
    </>
  )
};

export default User;
