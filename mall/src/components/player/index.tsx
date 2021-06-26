import React, { useState, useEffect, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RDPlayer from "react-dplayer"
import DPlayer from 'dplayer';
import Flvjs from "flv.js"
import style from './style.scss'
import { ChatsContext } from '@/components/chats'
import deta from '@/scss/live/detail.scss'
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase';

interface Props {
  isHiddenChat: boolean
  // [name: string]: any
  playAddr: any,
  videoShotImg: string
  activeIndex: number
  [name: string]: any
}

interface RefEl {
  // isHiddenChat: boolean
  [name: string]: any
}

const Player = (props: any) => {

  let dp:any;
  // 播放器实例
  // let [dp, setDp] = useState<Object>({
  //   video:{
  //     paused:true
  //   }
  // })
  // 视频质量
  const quality: Array<any> = [
    {text:'1',label:'蓝光',active:true,},
    {text:'2',label:'超清',active:false,},
    {text:'3',label:'流畅',active:false,}
  ]
  // 播放线路
  const videoLine:Array<any> = [
    { text: '1', label:'线路1'}
  ]
  // 视频HTML元素
  const pleyerEl: RefEl = useRef<Element>(null)
  var [init, setInit] = useState<boolean>(false)

  // debugger
  // if (props && !props.isHiddenChat) {
  //   var { state, dispatch } = useContext(ChatsContext)
  // }
  // const ready = () => {
  //   if (!props.isHiddenChat) {
  //     const { socket } = state
  //     const { dp } = pleyerEl.current
  //     setInit(true)
  //     socket.on('message', (data: any) => {
  //       console.log('接收', data)
  //       dp.danmaku.draw({
  //         text: data.message,
  //         color: '#ffc71c',
  //         type: 'right',
  //       })
  //     })

  //   }
  // }
  // useEffect(() => {
  //   if (!init) {
  //     ready()
  //   }
  // }, [])

  const [OpenChaoqing, setOpenChaoqing] = useState(false);
  const [age, setAge] = React.useState('');
  const handleChange = (event: any) => {
    setAge(event.target.value)
  }
  const Huazhi = (event: any) => {
    if (OpenChaoqing === false) {
      setOpenChaoqing(true);
    } else {
      setOpenChaoqing(false);
    }
  }
  const setVideoOptions = () => ({
    // container: document.getElementById('dplayer'),
    container: pleyerEl.current,
    autoplay: true,
    controls:true,
    live: true,
    video: {
      customType: {
        customFlv: (video: any, player: any) => {
          const flvPlayer = Flvjs.createPlayer({
            type: 'flv',
            url: video.src,
          })
          flvPlayer.attachMediaElement(video)
          flvPlayer.load()
          // player.play()
        },
      },
      quality: props.item && props.item.playAddr && props.item.playAddr.length && props.item.playAddr.map((item: { playUrl: string, protocolType: string }) => ({
        name: '高清',
        url: item.playUrl,
        type: 'customFlv',
      })),
      defaultQuality: 0,
      pic: props.item.room_img,
    },
    // thumbnails: 'https://sta.cranemarsh.com/file/live/room/cover/163656.jpg?t=1603962077',
  })

  
  useEffect(()=>{
    dp = new DPlayer({ ...setVideoOptions() })
  })
  useEffect(() => {
    // dp.switchVideo({
    //   quality: props.item && props.item.playAddr && props.item.playAddr.length && props.item.playAddr.map((item: { playUrl: string, protocolType: string }) => ({
    //     name: '高清',
    //     url: item.playUrl,
    //     type: 'customFlv',
    //   }))
    // })
  }, [props.item.room_id])
  return props.isHiddenChat ? <div id='dplayer' ref={pleyerEl} style={{ height: '100%' }} /> :
    <>
      <div id='dplayer' ref={pleyerEl} className={deta.video} />
      {/* 播放mask */}
      <div className={props.isHiddenChat ? style.hidden : deta.videoMask}>
        <div className={deta.playingleft}>
          {
            dp.video.paused ? <div className={deta.playBtn} data-play='暂停'></div> : <div className={deta.playBtn} data-play='播放'></div>
          }
          <div className={deta.playRefre}></div>
        </div>
        <div className={deta.playingright}>
          <div className={deta.chaoqing}>
            <p className={deta.chaoqingp2} onClick={(e) => Huazhi(e)}><span className={deta.chaoqingtext}>超清</span></p>
            {/* 弹出框 */}
            <div className={`${deta.chaobox} ${OpenChaoqing ? deta.ope : ''}`}>
              <div className={deta.lineSelect}>
                <span>线路:</span>
                <div className={deta.lineSelerig}>
                  <NativeSelect
                    id='demo-customized-select-native'
                    value={age}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                  >
                    {videoLine.map(item => (<option aria-label='None' value={10}>{item.label}</option>))}
                  </NativeSelect>
                </div>
              </div>
              <div className={deta.customer}>
                <span>画质:</span>
                <ul className={deta.custItem}>
                  {quality.map(item => <li key={item.text}>{item.label}</li>)}
                </ul>
              </div>
              <span className={deta.sanicon}></span>
            </div>
          </div>
          <div className={deta.dpsetting}>弹</div>
          <div className={deta.dplayfull}></div>
        </div>
      </div>
    </>
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
    backgroundColor: 'transparent',
    border: 'solid 0.5px #8b8b8a',
    fontSize: 12,
    color: '#8b8b8a',
    padding: '5px 6px 5px 6px',
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
      borderRadius: 2,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 1px rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default Player







