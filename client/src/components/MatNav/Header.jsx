import {
  AppBar,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Fab,
  Grid,
} from '@material-ui/core';
import { Home, KeyboardArrowUp } from '@material-ui/icons';
import * as React from 'react';
import HideOnScroll from './HideOnScroll';
import SideDrawer from './SideDrawer';
import BackToTop from './BackToTop';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logOutUser } from '../../store/actions/authActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navListDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

const navLinks = [
  { title: `about us`, path: `/about-us` },
  { title: `product`, path: `/product` },
  { title: `blog`, path: `/blog` },
  { title: `contact`, path: `/contact` },
  { title: `faq`, path: `/faq` },
];

const Header = ({ auth, logOutUser, history }) => {
  const classes = useStyles();

  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };

  const handleChange = (event) => {
    // setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // setAnchorEl(null);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" aria-label="home">
              <a href="/" style={{ color: `white` }}>
                <Home fontSize="large" />
              </a>
            </IconButton>

            <Hidden smDown>
              <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navListDisplayFlex}
              >
                {navLinks.map(({ title, path }) => (
                  <a href={path} key={title} className={classes.linkText}>
                    <ListItem div>
                      <ListItemText primary={title} />
                    </ListItem>
                  </a>
                ))}
              </List>
            </Hidden>
            <Hidden mdUp>
              <SideDrawer navLinks={navLinks} />
            </Hidden>

            <Grid container justify="flex-end">
              {auth.isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/users">Users</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/${auth.me.username}`}>Profile</Link>
                  </li>
                  {auth.me?.role === 'ADMIN' && (
                    <li className="nav-item">
                      <Link to="/admin">Admin</Link>
                    </li>
                  )}
                  <li className="flex-1" />
                  <img className="avatar" src={auth.me.avatar} />
                  <li className="nav-item" onClick={onLogOut}>
                    <a href="#">Log out</a>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex-1" />
                  <li className="nav-item">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* <Toolbar id="back-to-top-anchor" /> */}

      <BackToTop>
        <Fab color="secondary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Header);
