import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import AppLayout from 'AppLayout'
import Home from 'Home'
import Database from 'Database'
import RestaurantTable from 'RestaurantTable'
import BundleListTable from 'BundleListTable'
import BundleTable from 'BundleTable'
import AboutUs from 'AboutUs'
import NotFound from 'NotFound'

const App = React.createClass({
  render() {
    return (
      <AppLayout>
        {this.props.children}
      </AppLayout>
    )
  }
})

const Routes = React.createClass({
  render() {
    return (
      <Router
        history={browserHistory}
      >
        <Route
          path='/'
          component={App}
        >
          <IndexRoute
            component={Home}
          />
          <Route
            path='database'
            component={Database}
          >
            <IndexRoute
              component={RestaurantTable}
            />
            <Route
              path='restaurant/:restaurantId'
              component={BundleListTable}
            >
              <Route
                path='bundle/:bundleId'
                component={BundleTable}
              />
            </Route>
          </Route>
          <Route
            path='about'
            component={AboutUs}
          />
          <Route
            path='*'
            component={NotFound}
          />
        </Route>
      </Router>
    )
  }
})

export default Routes