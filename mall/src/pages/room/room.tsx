import React, { useState, useContext, useEffect, useRef } from 'react'
import history from '@/utils/history'
import Chats, { ChatsContext } from '@/components/chats'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import style from '@/scss/room/room.scss';
import Collapse from '@/components/collapse'
import deta from '@/scss/live/detail.scss'
interface ScrollRef {
  // isHiddenChat: boolean
  [name: string]: any
}
const Room = (props: any) => {
  return (
    <div className={deta.detamain}>
      <div className={deta.right}>
        <div className={deta.roomFlex}>
          <Title />
          <Chats item={props.location.state.item && props.location.state.item} />
        </div>
      </div>
    </div>
  );
}

export default Room

const Title = () => (
  <div className={deta.topbj}>
    <div className={deta.lefttit}>
      <div className={deta.leftimg}>
        <img
          src='http://222.186.150.148:8001/static/images/room/logo1.webp'
          className={deta.leftimglogo1}
        />
      </div>
      <div className={deta.lefttext}>
        大田市民<span className={deta.zoo}>0</span>
      </div>
    </div>
    <div className={deta.leftcent}>
      <p>巴西甲</p>
      <p className={deta.dateing}>2020/09/10</p>
      <p>更多数据</p>
    </div>
    <div className={deta.lefttit}>
      <div className={deta.lefttext}>
        <span className={deta.zoo2}>0</span>浦项制铁
      </div>
      <div className={deta.rightimg}>
        <img
          src='http://222.186.150.148:8001/static/images/room/logo2.webp'
          className={deta.rightimglogo1}
        />
      </div>
    </div>
  </div>
);
