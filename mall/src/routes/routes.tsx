import { lazy } from 'react'

const appModule = [
  {
    path: '/',
    name: 'home',
    attrs: {
      exact: true
    },
    component: lazy(() =>
      import(/* webpackChunkName: "home" */ '@/pages/home')
    )
  }
]


// 直播
const layoutModule = [
  {
    path: '/layout',
    name: 'layout',
    attrs: {
      exact: false
    },
    component: lazy(() =>
      import(/* webpackChunkName: "room" */ '@/pages/layout')
    )
  }
]
// 足球比赛 比分
const scoreModule = [
  {
    path: '/score',
    name: 'score',
    attrs: { exact: true },
    component: lazy(() => import('@/pages/score'))
  }
]
// 足球比赛 详情
const FeixiModule = [
  {
    path: '/detail',
    name: 'detail',
    attrs: { exact: true },
    component: lazy(() => import('@/pages/score/detail'))
  }
]

const userModule = [
  {
    path: '/user',
    name: 'user',
    attrs: { exact: true },
    component: lazy(() => import('@/pages/user'))
  }
]

export default [...appModule, ...layoutModule, ...scoreModule, ...FeixiModule, ...userModule]
