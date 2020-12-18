import { lazy } from 'react';

const appModule = [
  {
    path: '/',
    name: 'home',
    attrs: {
      exact: true
    },
    component: lazy(() =>
      import(/* webpackChunkName: "home" */ '@/pages/home/home')
    )
  }
];

const userModule = [
  {
    path: '/user',
    name: 'user',
    attrs: {
      exact: true
    },
    component: lazy(() =>
      import(/* webpackChunkName: "user" */ '@/pages/user/user')
    )
  }
];

export default [...appModule, ...userModule];
