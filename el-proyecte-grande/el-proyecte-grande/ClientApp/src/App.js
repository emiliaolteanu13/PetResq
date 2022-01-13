import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { PetsForAdoption } from "./components/PetsForAdoption";
import { NotFound } from './components/NotFound';
import { Provider } from 'react-redux';
import { store } from "./actions/store";

import './custom.css'

/// index.js injects this app file into the index html

/// this renders different layouts with components based on the route
/// as this app.js  is the only page ever loaded
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Router>
        <Layout />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/find'>
            <Provider store={store}>
              <PetsForAdoption/>
            </Provider>
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}



///#D468B2
///#FF7125
///#08032F
///#4985F4
///#BEBEDB