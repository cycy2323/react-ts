import React, { useState, useEffect } from 'react';
import './dropdown.css';

// 使用方法 父组件传值 dataSelect
{
  /* <Selectes dataSelect={data}/> */
}
interface Props {
  dataSelect: Array;
}

export default function Dropdown1 (props: Props) {
  let dataSelect;
  // console.log(props.dataSelect)
  if (props) {
    dataSelect = props.dataSelect;
  }

  const [dropDown, setDropDown] = useState(false);
  const [pList, setpList] = useState('第1条');
  const list = [
    '第1条',
    '第2条',
    '第3条',
    '第4条'
  ];

  const handleClick = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setDropDown(!dropDown);
  };
  const listClick = e => {
    console.log(e);
    const list2 = [...list];
    const listx = list2.filter((item, index) => {
      let arrctn;
      if (index === e) {
        arrctn = item;
      }
      return arrctn;
    });
    setpList(listx);
    setDropDown(!dropDown);
  };

  const widonclick = () => {
    setDropDown(false);
  }
  useEffect(() => {
    window.addEventListener('click', widonclick)
    return () => {
      window.removeEventListener('click', widonclick)
    }
  }, [])

  return (
    <div className={`dropdownlist ${dropDown? 'show1':''}`} >
      <div className='drop-text' onClick={handleClick}>
        <p className='drop-value'>{pList}</p>
        <span className='drop-icon'></span>
      </div>
      <ul className={`dropUl ${dropDown? 'in':''}`} >
        {list.map((item, index) => {
          return (
            <li key={index} onClick={e => listClick(index)}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
