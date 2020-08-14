/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Discovery from './components/discovery/Discovery';
import Search from './components/search/Search';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.SEARCH} component={Search} />
        <Route path={routes.DISCOVERY} component={Discovery} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
