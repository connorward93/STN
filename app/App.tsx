/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './screens/Home';
import Discovery from './screens/Discovery';
import Search from './screens/Search';
import Mixtapes from './screens/Mixtapes';

export default function App() {
  return (
    <Switch>
      <Route path="/search/" component={Search} />
      <Route path="/discovery/:id" component={Discovery} />
      <Route path="/mixtapes/" component={Mixtapes} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
}
