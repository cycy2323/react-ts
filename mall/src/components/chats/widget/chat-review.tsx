import React, { useEffect, useContext, useState, useRef } from 'react'
import style from './widget.scss'
import { ChatsContext } from '../index'
import { Message, EmitOnMsg } from '@/models/room'
import ChatInput from './chat-input'

// 生成消息id
const generateMsgId = () => {
  return String(new Date().getTime()) + Math.floor(Math.random() * 899 + 100)
}

// 时间格式
const generateTime = () => {
  const hour = new Date().getHours()
  const minute = new Date().getMinutes()
  const hourText = hour === 0 ? '00' : String(hour)
  const minuteText = minute < 10 ? '0' + minute : String(minute)
  return hourText + ':' + minuteText
}

const ChatReview: React.FC = () => {
  const { state, ioDispatch } = useContext(ChatsContext)
  const [init, setInit] = useState<boolean>(false)

  const updateMsg: Function = (data: EmitOnMsg) => {
    const newMsg: Message = {
      type: 'chat',
      username: data.username,
      uid: data.messageId,
      action: data.message,
      msgId: generateMsgId(),
      time: generateTime()
    }
    ioDispatch({
      type: 'UPDATE_USER_MESSAGE',
      payload: {
        message: newMsg
      }
    })
  }

  const updateSysMsg: Function = (o: any, action: string) => {
    const newMsg: Message = {
      type: 'system',
      username: o.user.username,
      uid: o.uid,
      action: '进入直播间',
      // action: action,
      msgId: generateMsgId(),
      time: generateTime()
    }
    ioDispatch({
      type: 'UPDATE_SYSTEM_MESSAGE',
      payload: {
        onlineCount: o.onlineCount,
        onlineUsers: o.onlineUsers,
        message: newMsg
      }
    })
  }

  const ready = () => {
    const { socket } = state
    setInit(true)
    socket.on('message', (data: any) => {
      updateMsg(data)
    })
    // 对应reg
    socket.on('joinRoom', (o: any) => {
      console.log('joinRoom----->', o);
      updateSysMsg(o, 'login')
    })
    // 离开房间
    socket.on('leaveRoom', (o: any) => {
      updateSysMsg(o, 'login')
    })
    // 用户列表
    socket.on('onlineUser', (o: any) => {
      updateSysMsg(o, 'login')
    })
    // 登录后更新注册信息
    socket.on('updateReg', (o: any) => {
      updateSysMsg(o, 'login')
    })
  }
  if (!init) ready()

  const scrollToMessageList = useRef(null)
  useEffect(() => {
    // window.scrollTo(0, scrollToMessageList.current.scrollTop + 50)
  })

  const onLine = () => {
    const { socket } = state
    socket.emit('online', '')
  }


  return (
    <>
      <div className={style.roomright}>
        <div className={style.roomtop}>
          <span className={style.roomlts}>聊天室</span>
          <p>
            {state.onlineCount}<span className={style.roomtou} onClick={onLine}></span>
          </p>
        </div>
        <div className={style.roomRen}>
          <ul className={style.roomMsg}>

            {
              state.messages.map((message: any) =>
                <Message key={message.msgId} msgText={message.action} userName={message.username} msgTime={message.time} />
              )
            }
            {/* <li>
              <span className={style.name}>Williamsheeran:</span>
              <span className={style.desc}>进入直播间</span>
            </li>
            <li>
              <span className={style.name}>Williamsheeran:</span>
              <span className={style.desc}>进入直播间</span>
            </li>
            <li className={style.lge}>
              <span className={style.name}>Williamsheeran:</span>
              <span className={style.desc}>进入直播间</span>
            </li> */}
          </ul>
        </div>
        <ChatInput />
      </div>
      {/* <div className={style.ChatReview} ref={scrollToMessageList}>
        <div>房间人数: {state.onlineCount}</div>
        {
          state.messages.map((message: any) =>
            <Message key={message.msgId} msgText={message.action} userName={message.username} msgTime={message.time} />
          )
        }
      </div> */}
    </>
  )
}
const Message = (props: any) => {
  return <>
    <li>
      <span className={style.name}>{props.userName}:</span>
      <span className={style.desc}>{props.msgText}</span>
    </li>
    {/* <div style={{ margin: '10px 10px' }}>
      <div>时间: {props.msgTime}</div>
      <span>用户: {props.userName} :  </span>
      <span>{props.msgText}</span>
    </div> */}
  </>
}

export default ChatReview
