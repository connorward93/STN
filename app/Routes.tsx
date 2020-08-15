/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Discovery from './components/discovery/Discovery';
import Search from './components/search/Search';
import Mixtapes from './components/mixtapes/Mixtapes';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path="/search/" component={Search} />
        <Route path="/discovery/:id" component={Discovery} />
        <Route path="/mixtapes/" component={Mixtapes} />
        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  );
}
