import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loading from '@/components/Loading';

import routes from './routes';

const AppRouter = () => (
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <Switch>
        {routes.map((row, index) => (
          <Route
            render={(props) => React.createElement(row.component, { ...props, meta: row.meta })}
            path={row.path}
            strict={row.strict}
            exact={row.exact}
            key={row.name || index}
          />
        ))}
      </Switch>
    </BrowserRouter>
  </Suspense>
);

export default AppRouter;
