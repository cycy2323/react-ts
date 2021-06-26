import React, { useState, useEffect, useRef, lazy } from 'react';

import Nav from '@/components/nav';
import score from '@/scss/score/score.scss';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Selects from '@/components/Selects/index';
import { Route } from 'react-router-dom';

import '@/scss/score/materUi.css';


export default function Score() {
  const headnav = [
    { tabName: '比分', id: 0, path: 'scoreList/score' },
    { tabName: '完场', id: 1, path: 'scoreList/wanchang' },
    { tabName: '赛程', id: 2, path: 'scoreList/saichen' },
    { tabName: '完整', id: 3, path: 'scoreList/wanzheng' }
  ];
  const [headnavIndex, setHeadnavIndex] = useState(0);
  const dataSele = ['选择赛事11', '选择赛事22', '选择赛事33'];
  const dataSele2 = ['选择走势11', '选择走势22', '选择走势33'];

  const [path, setPath] = useState<string>(headnav[headnavIndex].path);

  const [state, setState] = React.useState({
    checkedA: true
  });
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }

  // 通道定义足球列表 ：/bf/list/1足球落地页 ：/bf/detail/1/赛事ID 篮球列表 ： /bf/list/2篮球落地页 ： /bf/detail/2/赛事ID

  return (
    <div className={score.main}>
      <Nav />
      <div className={score.main2}>
        <div className={score.navwrap}>
          <div className={score.navfilter}>
            <ul className={score.headtab}>
              {headnav.map((item, index) => {
                return (
                  <li
                    className={`${score.headli} ${index === headnavIndex ? score.activeHead : ''
                      }`}
                    key={index}
                    onClick={() => {
                      setHeadnavIndex(index);
                      setPath(item.path);
                    }}
                  >
                    {item.tabName}
                  </li>
                );
              })}
            </ul>
            <div className={score.navright}>
              <div className='chech1' id='chech1'>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name='checkedA'
                      color='primary'
                    />
                  }
                  label='亚'
                />
              </div>
              <div className='chech1'>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name='checkedA'
                      color='primary'
                    />
                  }
                  label='欧'
                />
              </div>
              <div className='chech1 chech22'>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name='checkedA'
                      color='primary'
                    />
                  }
                  label='大'
                />
              </div>
              <div className={score.saishisele}>
                <Selects dataSelect={dataSele} />
              </div>
              <div className={score.saishisele2}>
                <Selects dataSelect={dataSele2} />
              </div>
              <div className={score.shezhi}>
                设置<span className={score.shezhiicon}></span>
              </div>
            </div>
          </div>
        </div>
        <div className={score.page}>
          {/* 路由切换 */}
          <Route
            component={lazy(() =>
              import(/* webpackChunkName: "all" */ `@/pages/score/${path}`)
            )}
          />
        </div>
      </div>
    </div>
  );
}


