import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// 获取渲染容器节点
const app: HTMLElement | null = document.getElementById('app');

// 定义全局变量
declare var module: any;
window.global_var = 1
/**
 * 渲染ReactDOM
 */
function renderReactDOM() {
  ReactDOM.render(<App />, app);
}

// 接收热更新输出，只有accept才能被更新
if (module.hot) {

  renderReactDOM();
  module.hot.accept();
} else {
  debugger
  window.onload = () => {
    renderReactDOM();
  };
}
