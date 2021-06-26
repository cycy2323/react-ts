import React, { useState, useEffect, useRef } from 'react'

import score from '@/scss/score/score.scss'
import history from '@/utils/history'
import io from 'socket.io-client'

import { useDispatch, useSelector } from 'react-redux'
import { scoreAction } from '@/actions'
import { RootState } from '@/reducers'
import { time } from '@/utils/regular'

const socket = io('http://222.186.150.148:9092/bf/list/1', {
  transports: ['websocket'],
})
export default function Score() {
  const [listhead, setListhead] = useState(false)

  // 吸顶效果
  useEffect(() => {
    window.addEventListener('scroll', handScroll)
    return () => {
      window.removeEventListener('scroll', handScroll)
    }
  }, [])
  function handScroll() {
    const Top = document.documentElement.scrollTop || document.body.scrollTop
    // console.log(Top)
    if (Top >= 13) {
      setListhead(true)
    } else {
      setListhead(false)
    }
  }
  const dispatch = useDispatch()
  const matchs = useSelector((state: RootState) => state.score['matchsList'])

  useEffect(() => {
    dispatch({
      type: `score/${scoreAction.GET_MATCH}`,
      payload: { date: '', sportId: '1', status: '2' }
    })
    console.log('scoreStore', matchs)
  }, [])

  socket.on('connect', () => {
    socket.on('message', (date: any[]) => {
      console.log('date', date)
      // "{"type":"static","matchId":16510,"data":[16510,0,0,2,1,1,1]}"
      // "{"type":"status","matchId":7653,"data":[7653,3,"100",""]}"
    })
  })
  return (
    <div className={score.wrap01}>
      <ScoreNav />
      <div className={`${score.listheader} ${listhead ? score.listheader2 : ''}`}>
        <ul className={score.listtop}>
          <li className={`${score.cell} ${score.cell1}`}>选择</li>
          <li className={`${score.cell} ${score.cell2}`}>比赛</li>
          <li className={`${score.cell} ${score.cell3}`}>时间</li>
          <li className={`${score.cell} ${score.cell4}`}>状态</li>
          <li className={`${score.cell} ${score.cell5}`}>
            主场球队比分客场球队
              </li>
          <li className={`${score.cell} ${score.cell6}`}>半场</li>
          <li className={`${score.cell} ${score.cell7}`}>角球</li>
          <li className={`${score.cell} ${score.cell8}`}>直播</li>
          <li className={`${score.cell} ${score.cell9}`}>走势</li>
          <li className={`${score.cell} ${score.cell10}`}>数据中心</li>
          <li className={`${score.cell} ${score.cell11}`}>人气</li>
          <li className={`${score.cell} ${score.cell12}`}>功能</li>
        </ul>
      </div>
      <div className={`${score.zhidisaisi} ${score.zhidisaisi22}`}>
        <p className={score.zdsstext}>置顶赛事</p>
        <ul className={score.ulgame}>
          {matchs.length && matchs.map((item, index) => {
            return (<Ligames key={item[0]} item={item && item} />)
          })}
        </ul>
      </div>
      {/* <div className={`${score.zhidisaisi}`}>
        <p className={score.zdsstext}>最佳</p>
        <ul className={`${score.ulgame} ${score.shadow1}`}>
          {matchs.map((item, index) => {
            return (<Ligames key={index} item={item && item} />)
          })}
        </ul>
      </div> */}
      {/* <div className={`${score.zhidisaisi}`}>
        <p className={score.zdsstext}>最佳</p>
        <ul className={`${score.ulgame} ${score.shadow1}`}>
          {liArray.map((item, index) => {
            return <Ligames key={index} />
          })}
        </ul>
      </div> */}
    </div>
  )
}

const Ligames = (props: any) => {
  const { item } = props
  // item[27] 盘中
  let intraday = item[27]
  // item[28] 赔率
  let odds = item[28]
  const [selectLi, setSelectLi] = useState(false)
  const [keepLi, setKeepLi] = useState(false)
  const goFeixi = () => {
    history.push('/detail')
  }

  return (
    <li className={score.ligame}>
      <p
        className={`${score.lic1} ${selectLi ? score.checked : ''}`}
        onClick={() => {
          setSelectLi(!selectLi)
        }}
      >
        <span></span>
      </p>
      {/* 联赛名称 */}
      <div className={score.lic2}>
        <img src={item[10]} className={score.xjicon} alt="" />
        {item[3]}
      </div>
      {/* 时间 */}
      <p className={score.lic3}>{time(item[1])}</p>
      <div className={score.lic4} onClick={() => history.push('/detail')}>
        查看<span className={score.jt} ></span>
      </div>

      <div className={score.lic5}>
        {/* 主场球队比分客场球队 */}
        <div className={score.bileft}>
          {'{'}{intraday[1] || 0}个{'}'}
          <span style={{ width: '90px', textAlign: 'right' }}>{item[2]}</span>
        </div>
        <p className={score.nubmer}>{intraday[3] || 0}-{intraday[4] || 0}</p>
        <div className={score.biright}>
          <span style={{ width: '90px', textAlign: 'left' }}>{item[3]}</span>
          {'{'}{intraday[2] || 0}个{'}'}
        </div>
      </div>

      <p className={score.lic6}>
        {/* 半场 */}
        <span className={score.bang}>{intraday[3] || 0}-{intraday[4] || 0}</span>
      </p>
      {/* 角球 */}
      <p className={score.lic7}>
        {intraday[9] || 0}-{intraday[10] || 0}
      </p>
      {/* 直播 */}
      <div className={score.lic8}>
        <div className={score.steam1}>
          <img
            src='http://222.186.150.148:8001/static/images/home/steam.gif'
            className={score.steam2}
          />
          <span className={score.steam3}>LIVE</span>
        </div>
      </div>
      <div className={score.lic9}>
        <div className={score.zousi}>
          <div className={score.linecell}>
            <p className={score.linec1}>1.350</p>
            <p className={score.linec1}>0.35</p>
            <p className={score.linec1}>0.350</p>
          </div>
          <div className={score.linecell}>
            <p className={score.linec1}>1.350</p>
            <p className={score.linec1}>0.35</p>
            <p className={score.linec1}>0.350</p>
          </div>
        </div>
      </div>
      <div className={score.lic10}>
        <span className={score.qingbao}>情报</span>
        <span className={score.fenxi} onClick={goFeixi}>分析</span>
        <span className={score.fenxi}>走势</span>
      </div>
      {/* 人气 */}
      <div className={score.lic11}>
        <span className={score.toux}></span>{item[25]}
      </div>
      <div className={score.lic12}>
        <span className={score.downicon}></span>
        <p
          className={`${score.keep} ${keepLi ? score.actives : ''}`}
          onClick={() => {
            setKeepLi(!keepLi)
          }}
        ></p>
      </div>
    </li>
  )
}

// 左侧导航兰
const ScoreNav = () => {
  return (
    <div className={score.leftnav}>
      <ul className={score.leftul}>
        <li className={score.leftli}>
          <p className={score.keepleft1}></p>
          <p className={score.keepleft2}>收藏</p>
        </li>
        <li className={score.leftli}>
          <p className={score.keepleiocn1}></p>
          <p className={score.keepleft2}>保留</p>
        </li>
        <li className={score.leftli}>
          <p className={score.keepleiocn2}></p>
          <p className={score.keepleft2}>隐藏</p>
        </li>
      </ul>
    </div>
  )
}
