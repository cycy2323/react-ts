import React, { createContext, useReducer, useEffect, useState } from 'react';
import io from 'socket.io-client';
import style from './style.scss';
import Player from '@/components/player';
import deta from '@/scss/live/detail.scss'
import ChatReview from './widget/chat-review'
import { StateType, Login, SystemMessage, Message, UserMessage, Payload, ActionType } from '@/models/room'
import { sessionStorageGet } from '@/utils/regular'

const ChatsContext: any = createContext(null)
const ChatsContextConsumer: any = ChatsContext.Consumer
// http://222.186.150.148:9092/chat
// http://222.186.150.148:8002/chat
// http://172.24.135.22:9092/chat
const initValue: StateType = {
  username: '',
  uid: '',
  socket: io('http://222.186.150.148:9092/chat', {
    transports: ['websocket'],

    // transportOptions: {
    //   polling: {
    //     extraHeaders: {
    //       'x-clientid': 'abc'
    //     }
    //   }
    // }
    // query: {
    //   token: 'cde',
    //   // roomId: '2'
    // }
  }),
  messages: [],
  onlineUsers: [],
  onlineCount: 0,
  userhtml: ''
}

const login = (info: Login): object => {
  return info
}

const systemmessage = (sysMsg: SystemMessage, state: any): object => {
  return {
    onlineCount: sysMsg.onlineCount,
    onlineUsers: sysMsg.onlineUsers,
    messages: state.messages.concat(sysMsg.message),
  }
}
const userMessage = (usrMsg: UserMessage, state: any): object => {
  return {
    messages: state.messages.concat(usrMsg.message)
  }
}

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'login':
      return { ...state, ...login(action.payload) }
    case 'UPDATE_SYSTEM_MESSAGE':
      return { ...state, ...systemmessage(action.payload, state) }
    case 'UPDATE_USER_MESSAGE':
      return { ...state, ...userMessage(action.payload, state) }
    default:
      return state
  }
}

const Chats = (props: any) => {
  const [state, ioDispatch] = useReducer(reducer, initValue)
  const setToken = () => {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', String(new Date().getTime()) + Math.floor(Math.random() * 899 + 100))
    }
    return localStorage.getItem('token')
  }
  useEffect(() => {
    const { socket } = state
    socket.on('connect', () => {
      socket.emit('reg', {
        token: (sessionStorageGet('login', '') && sessionStorageGet('login', '').token) || setToken() + ' + web',
        roomId: props.item.room_id,
        user: {
          "messageId": String(new Date().getTime()) + Math.floor(Math.random() * 899 + 100), // 消息唯一ID
          uid: '456',
          "username": (sessionStorageGet('login', '') && sessionStorageGet('login', '').nickName) || "访客", //用户名
          "messageType": 1,   // 1文本, 2礼物, 3表情
          "message": "进入直播间",  // 消息
        }
      })
    })
  }, [])
  return <ChatsContext.Provider value={{ state, ioDispatch }}>
    <>
      {/* room */}
      <div className={deta.ctn}>
        <div className={deta.roomleft}>
          <div className={deta.roomtit}>
            <div className={deta.iconctn}>
              <div className={deta.icontu}></div>
              <div className={deta.icontext}>
                <p className={deta.lqao}>拉齐奥VS尤文图斯</p>
                <p className={deta.dds}>
                  <span className={deta.ddname}>嘟嘟噢耶</span>
                  <span className={deta.inconhome}></span>
                  <span>0808280222</span>
                  <span className={deta.inconhou}></span>
                  <span>{state.onlineCount * 666}</span>
                </p>
              </div>
            </div>
            <div className={deta.guanzhu}>关注</div>
          </div>
          {/* 直播间 */}
          <div className={deta.playtv}>
            <Player item={props.item && props.item} isHiddenChat={false} />
          </div>
        </div>
        <ChatReview />
      </div>
    </>
  </ChatsContext.Provider >
}


export { ChatsContext, ChatsContextConsumer }
export default Chats
