import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import DisciplinePage from './components/DisciplinePage'
import LeaguePage from './components/LeaguePage'
import SeasonPage from './components/SeasonPage'
import RacesPage from './components/RacesPage'
import RaceDetailsPage from './components/RaceDetailsPage'
import DisciplinePage2 from './components/DisciplinePage2'
import RacesPageToSignUp from './components/RacesPageToSignUp'
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        <Route path='/discipline' component={(props) => <DisciplinePage {...props} key={window.location.pathname}/>} />
        <Route path='/league' component={(props) => <LeaguePage {...props} key={window.location.pathname}/>} />
        <Route path='/season' component={(props) => <SeasonPage {...props} key={window.location.pathname}/>} />
        <Route path='/race_details' component={(props) => <RaceDetailsPage {...props} key={window.location.pathname} />} />
        <Route path='/race' component={(props) => <RacesPage {...props} key={window.location.pathname} />} />
        <Route path='/race_signups' component={(props) => <DisciplinePage2 {...props} key={window.location.pathname}/>} />
        <Route path='/racelist_signups' component={(props) => <RacesPageToSignUp {...props} key={window.location.pathname} />} />

      </Layout>
    );
  }
}
