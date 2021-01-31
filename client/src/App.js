import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';
import Admin from './pages/Admin/Admin';
import NotFound from './pages/NotFound/NotFound';
import Loader from './components/Loader/Loader';
import { makeStyles } from '@material-ui/core/styles';
import { logInUserWithOauth, loadMe } from './store/actions/authActions';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import Themes from './themes';
import Layout from './layout/Layout';

const App = ({ logInUserWithOauth, auth, loadMe }) => {
  useEffect(() => {
    loadMe();
  }, [loadMe]);

  //redosled hookova
  useEffect(() => {
    if (window.location.hash === '#_=_') window.location.hash = '';

    const cookieJwt = Cookies.get('x-auth-cookie');
    if (cookieJwt) {
      Cookies.remove('x-auth-cookie');
      logInUserWithOauth(cookieJwt);
    }
  }, []);

  useEffect(() => {
    if (!auth.appLoaded && !auth.isLoading && auth.token && !auth.isAuthenticated) {
      loadMe();
    }
  }, [auth.isAuthenticated, auth.token, loadMe, auth.isLoading, auth.appLoaded]);

  return (
    <>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <Layout>
          {auth.appLoaded ? (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/users" component={Users} />
              <Route path="/notfound" component={NotFound} />
              <Route path="/admin" component={Admin} />
              <Route exact path="/:username" component={Profile} />
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          ) : (
            <Loader />
          )}
        </Layout>
      </ThemeProvider>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { logInUserWithOauth, loadMe }))(App);

