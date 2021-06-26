import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scoreAction } from '@/actions';
import { RootState } from '@/reducers';

import wanch from '@/scss/score/football/wanchang.scss';
import DatePicker from '@/components/datePicker'
import { time } from '@/utils/regular';
interface DataLi {
  date: string
  week: string
}
export default function Wanchang() {

  const dataLi: any = []

  const getWeekByDay = (dayValue: any) => {
    var day = new Date(Date.parse(dayValue.replace(/-/g, '/')))
    var today = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")
    return today[day.getDay()]
  }
  const getDate = (index: number) => {
    var date = new Date()
    var newDate = new Date()
    newDate.setDate(date.getDate() + index)
    var time = (newDate.getMonth() + 1) + "/" + newDate.getDate()
    var weekTime = (newDate.getMonth() + 1) + "-" + newDate.getDate()
    var year = `${newDate.getFullYear()}${(newDate.getMonth() + 1)}${newDate.getDate().toString().length === 1 ? '0' + newDate.getDate() : newDate.getDate()}`
    return [time, getWeekByDay(`${date.getFullYear()}-${weekTime}`), year]
  }
  let i = -6
  while (i <= 0) {
    const [date, week, year] = getDate(i)
    dataLi.push({
      date: date,
      week: week,
      year: year
    })
    i++
  }
  const [activeIndex, setActiveIndex] = useState<number>();


  const dispatch = useDispatch()
  const matchs = useSelector((state: RootState) => state.score['matchsList']);

  const activeTabs = (index: any) => {

    if (index.toString().length <= 1) {
      setActiveIndex(index);
      dispatch({
        type: `score/${scoreAction.GET_MATCH}`,
        payload: { date: dataLi[index] && dataLi[index].year, sportId: '1', status: '3' }
      })
    } else {
      setActiveIndex(dataLi.length);
      dispatch({
        type: `score/${scoreAction.GET_MATCH}`,
        payload: { date: `${index.getFullYear()}${index.getMonth() + 1}${index.getDate().toString().length === 1 ? '0' + index.getDate() : index.getDate()}`, sportId: '1', status: '3' }
      })
    }

  }

  useEffect(() => {
    activeTabs(dataLi.length - 1)
  }, [])


  const [matchsEle, setMatchsEle] = useState<any>()
  useEffect(() => {
  }, [matchs])
  return (
    <div className={wanch.wanchang}>
      <div className={wanch.fixed}>
        <div className={wanch.rilitop}>
          <div className={wanch.rilictn}>

            <span className={wanch.tubiao}></span>
            {/* 日历 */}
            {/* <span className={wanch.xiadown}></span> */}
            <DatePicker activeTabs={activeTabs} />
          </div>
          <ul className={wanch.rili}>
            {dataLi.map((item: any, index: number) => {
              return (
                <li
                  className={`${wanch.rililis} ${activeIndex === index ? wanch.actives : ''
                    }`}
                  key={index}
                  onClick={() => activeTabs(index)}
                >
                  <p className={wanch.rilidata}>{item.date}</p>
                  <span>{item.week}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={wanch.listheader}>
          <ul className={wanch.listtop}>
            <li className={`${wanch.cell} ${wanch.cell1}`}>编号</li>
            <li className={`${wanch.cell} ${wanch.cell2}`}>赛事</li>
            {/* <li className={`${wanch.cell} ${wanch.cell3}`}>轮次</li> */}
            <li className={`${wanch.cell} ${wanch.cell4}`}>时间</li>
            <li className={`${wanch.cell} ${wanch.cell5}`}>状态</li>
            <li className={`${wanch.cell} ${wanch.cell6}`}>
              主场球队比分客场球队
          </li>
            <li className={`${wanch.cell} ${wanch.cell7}`}>半场</li>
            <li className={`${wanch.cell} ${wanch.cell8}`}>角球</li>
            <li className={`${wanch.cell} ${wanch.cell9}`}>胜负</li>
            <li className={`${wanch.cell} ${wanch.cell10}`}>让球</li>
            <li className={`${wanch.cell} ${wanch.cell11}`}>进球数</li>
            <li className={`${wanch.cell} ${wanch.cell12}`}>技术统计</li>
          </ul>
        </div>
      </div>
      <div className={wanch.loading}>
        <div className={wanch.wraper1}>
          <ul className={wanch.ulbody}>
            {matchs.map((item, index) => {
              return (<Ligames key={index} item={item && item} />)
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Ligames = (props: any) => {
  const { item } = props
  // item[27] 盘中
  let intraday = item[27];
  // item[28] 赔率
  let odds = item[28];
  let winorLose;
  let ballSize;
  let rounds;
  if (intraday && odds && intraday[0]) {
    // 胜负
    winorLose = intraday[0] && intraday[0] - odds[2] - intraday[1]
    winorLose = winorLose == 0 ? '平' : winorLose > 0 ? '胜' : '负'
    // 大小
    ballSize = intraday[0] && intraday[0] + intraday[1] - odds[9]
    ballSize = ballSize == 0 ? '走' : ballSize > 0 ? '大' : '小'
    // 轮次
    rounds = odds[30]
  } else {
    return false
  }


  return (
    <li className={wanch.ligame}>
      <p className={wanch.lic1}>
        {/* 编号 */}
        {item[0]}
      </p>
      {/* 赛事 */}
      <div className={wanch.lic2}>
        <img src={item[10]} className={wanch.xjicon} alt="" />{item[4]}
      </div>
      {/* 轮次 */}
      {/* <p className={wanch.lic3}>{rounds}</p> */}
      {/* 时间 */}
      <div className={wanch.lic4}>
        {/* 查看<span className={wanch.jt}></span> */}
        {/* {item[21]}11 */}
        {time(item[1])}
      </div>
      <p className={wanch.lic5}>{item[22] == '3' ? '完场' : ''}</p>
      <div className={wanch.lic6}>
        {/* 主场球队比分客场球队 */}
        <div className={wanch.bileft}>
          {'{'}{intraday[1] || 0}个{'}'}
          <span style={{ width: '90px', textAlign: 'right' }}>{item[2]}</span>
        </div>
        <p className={wanch.nubmer}>{intraday[3] || 0}-{intraday[4] || 0}</p>
        <div className={wanch.biright}>
          <span style={{ width: '90px', textAlign: 'left' }}>{item[3]}</span>
          {'{'}{intraday[2] || 0}个{'}'}
        </div>
      </div>
      <p className={wanch.lic7}>
        {/* 半场 */}
        <span className={wanch.bang}>{intraday[3] || 0}-{intraday[4] || 0}</span>
      </p>
      {/* 角球 */}
      <p className={wanch.lic8}>
        {intraday[9] || 0}-{intraday[10] || 0}
      </p>
      {/* 胜负 */}
      <div className={wanch.lic9}>
        <span className={wanch.red}>{winorLose}</span>
      </div>
      <div className={wanch.lic10}>
        <p className={wanch.linec1}>0.5</p>
      </div>
      {/* 大小 */}
      <div className={wanch.lic11}>
        <span className={wanch.red}>{ballSize}</span>
      </div>
      <div className={wanch.lic12}>
        <span className={wanch.zousi}>走势</span>
        <span className={wanch.jstj}>技术统计</span>
      </div>
    </li >
  );
};