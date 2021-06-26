import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { UseRequestProvider } from 'ahooks';
import store from './store';
import AppRouter from './router';

// 全局请求配置
const GlobalRequestOptions = {
  formatResult: (rData) => (rData || {}).data,
  defaultLoading: true
};

const App = () => (
  <Provider store={store}>
    <Helmet
      title="U球直播-足球直播|NBA直播|篮球直播|欧洲杯直播-Uqiu.com"
      meta={[{
        name: 'keywords',
        content:
          '足球直播,篮球直播,NBA直播,英超直播,中超直播,欧洲杯直播,U球体育直播'
      }, {
        name: 'description',
        content: '【U球直播】免费提供各类高清足球直播,NBA直播,足球视频,nba视频直播等,包涵的赛事为提供英超,西甲,德甲,法甲,意甲,中超,欧冠等。U球体育以最全最高清信号让您畅享各大联赛,打造最好体育直播吧。'
      }]}
    />
    <UseRequestProvider value={GlobalRequestOptions}>
      <AppRouter />
    </UseRequestProvider>
  </Provider>
);

export default App;
