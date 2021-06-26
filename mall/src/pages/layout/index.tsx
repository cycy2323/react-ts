import React, { createContext, useReducer, useEffect, useState, lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import Header from '@/components/nav'
import style from './style.scss';
import Grid from '@material-ui/core/Grid'

const sidebarList = [
  {
    picture: 'http://222.186.150.148:8001/static/images/sidebar/all.webp',
    description: '全部',
    name: 'all',
    path: 'live-list/all'
  },
  {
    picture: 'http://222.186.150.148:8001/static/images/sidebar/soccer.webp',
    description: '足球',
    name: 'soccer',
    path: 'live-list/soccer'
  },
  {
    picture: 'http://222.186.150.148:8001/static/images/sidebar/basketball.webp',
    description: '篮球',
    name: 'basketball',
    path: 'live-list/basketball'
  },
  {
    picture: 'http://222.186.150.148:8001/static/images/sidebar/gaming.webp',
    description: '电竞',
    name: 'gaming',
    path: 'live-list/gaming'
  }
]
interface Props {
  main?: any
  [name: string]: any
}

const Sidebar: React.FC = (props: Props) => {
  const { state } = props.location
  const [path, setPath] = useState<string>(`${state.defaultPath || 'home/home'}`)

  return <>
    <Header />
    <div className={style.sidebar}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {sidebarList.map((item: any) =>
          SidebarItem(item, setPath)
        )}
      </Grid>
    </div>
    <div className={style.main}>
      {/* <Route loadComponent={loadProduct} path={'/' + path} /> */}
      <Route
        item={state && state.item && state.item}
        component={lazy(() =>
          import(/* webpackChunkName: "all" */ `@/pages/${path}`)
        )}
      />
    </div>
  </>

}

const SidebarItem = (item: any, setPath: Function) => {
  const [picture, setPicture] = useState<string>(item.picture)
  const activeImg = (str: string) => {
    var index = str.lastIndexOf('.')
    let strSplit = str.split('')
    strSplit[index] = '-active.'
    setPicture(strSplit.join(' ').replace(/\s+/g, ""))
  }

  return <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    key={item.description}
    className={style.sidebarItem}
    onClick={() => setPath(item.path)}
    onMouseEnter={() => activeImg(item.picture)}
    onMouseLeave={() => setPicture(item.picture)}
  >
    <img src={picture} className={style.img} alt="" />
    <span className={style.text}> {item.description}</span>
  </Grid >
}
export default Sidebar