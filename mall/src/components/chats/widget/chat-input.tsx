import React, { useEffect, useContext, useState, useRef } from 'react'
// import Input from '@/components/Input'
import style from './widget.scss'
import { ChatsContext } from '../index'
import { EmitOnMsg } from '@/models/room'

import InputBase from '@material-ui/core/InputBase'
import {
  fade,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid';
import { sessionStorageGet } from '@/utils/regular'

const generateUUID: Function = () => {
  let d: number = new Date().getTime()
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r: number = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

const generateMsgId: Function = () => {
  return String(new Date().getTime()) + Math.floor(Math.random() * 899 + 100) + generateUUID()
}

const ChatInput: React.FC = () => {
  const [value, setValue] = useState<string>()
  const inputEl: any = useRef(null)
  const { state, ioDispatch } = useContext(ChatsContext)

  const sendMessage = () => {
    if (!value) return
    const { socket } = state
    const emitMsg: EmitOnMsg = {
      messageId: generateMsgId(), // 消息唯一ID
      username: (sessionStorageGet('login', '') && sessionStorageGet('login', '').nickName) || '访客', // 进入直播间但是未登录统一username为'访客'
      messageType: 1, // 1文本, 2礼物, 3表情, 4登录, 5登出
      message: value  // 文本或者礼物对应的key值和表情
    }
    // socket.emit('onlineCountList', {
    //   "messageId": String(new Date().getTime()) + Math.floor(Math.random() * 81199 + 100), // 消息唯一ID
    //   "username": "一个人收到的信息", //用户名
    //   "messageType": 1,   // 1文本, 2礼物, 3表情
    //   "message": "一个人收到的信息"   // 消息
    // })
    socket.emit('message', emitMsg)
    setValue('')
    inputEl.current.value = ''
    inputEl.current.focus()
  }

  const handleKeyPress = (e: React.ChangeEvent<{}>) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
    return false
  }

  return <div className={style.roombottom}>
    <div className={style.msginput}>
      {/* <input
        type='text'
        name=''
        placeholder='我也来说几句'
        className={style.inputBox}
      ></input> */}
      <input type='text' className={style.inputBox} placeholder="我也来说几句" maxLength={140} ref={inputEl} onChange={e => setValue(e.target.value)} onKeyPress={handleKeyPress} />
      <div onClick={sendMessage} className={style.msgBtn}>发送</div>
    </div>
  </div>
  return (

    <div className={style.chatInput}>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <input placeholder="按回车提交" maxLength={140} ref={inputEl} onChange={e => setValue(e.target.value)} onKeyPress={handleKeyPress} type="text" />
        {/* <Grid item xs sm={2}>
          <Button size="small" variant="contained" color="primary" onClick={sendMessage}>发送</Button>
        </Grid>
        <Grid item xs sm={8} >
          <BootstrapInput ref={inputEl} onChange={e => setValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="点击回车发送" id="bootstrap-input" />
        </Grid>

        <Grid item xs sm={2}>
          <Button size="small" variant="contained" color="primary" onClick={sendMessage}>发送</Button>
        </Grid> */}
      </Grid>
    </div>

  )
}



const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 2,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    minWidth: '40px',
    padding: '5px 6px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.1rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase)
export default ChatInput
