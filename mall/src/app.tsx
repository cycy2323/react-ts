import React, { Suspense } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '@/routes/routes'
import history from '@/utils/history'
import store from '@/store'
import Loading from '@/components/loading'

const NotFound: React.FC = () => {
  return <div>页面找不到</div>
}

/**
 * 根据配置文件渲染路由
 * @param _routes
 */
const RenderRouteList = (_routes: Array<any>) => {
  return _routes.map((item, index) => {
    return (
      <Route
        key={index}
        path={item.path}
        component={item.component}
        {...item.attrs}
      />
    )
  })
}

/**
 * 路由注入
 */
const InjectRoute: React.FC = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Switch>
          {RenderRouteList(routes)}
          <Route path={'*'} component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* <Header /> */}
      <InjectRoute />
    </Provider>
  )
}

export default App
