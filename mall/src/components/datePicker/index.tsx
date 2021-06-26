import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './style.scss';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
const getWeekByDay = (dayValue: any) => {
  var day = new Date(Date.parse(dayValue.replace(/-/g, '/')))
  var today = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")
  return today[day.getDay()]
}
const DatePickers = (props: any) => {
  const [startDate, setStartDate] = useState<any>()
  const setDate = (dayValue: any) => {
    setStartDate(dayValue)
    props.activeTabs(dayValue)
  }
  return (
    <div className="warp">
      <DatePicker selected={startDate} onChange={date => setDate(date)} />
    </div>
  )
}

export default DatePickers