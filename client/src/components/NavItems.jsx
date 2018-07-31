import React from 'react';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';

const muiTheme = createMuiTheme();

const NavLinkItem = (props) => (
    <Link exact to={props.to} style={{textDecorationLine: 'none'}}>{props.label}</Link>
);

const NavItems = ({ children, user }) => {
  const anchorEl = null;
  const { loggedIn, email } = user;

  const handleClick = event => {
    this.anchorEl = event.currentTarget;
  };
  
  const handleClose = () => {
    this.anchorEl = null;
  };
  
  return (
    <MuiThemeProvider theme={muiTheme}>
      <div>
        <header>
          <AppBar position="static">
            <Toolbar>
              <IconButton onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                Title
              </Typography>
              <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(true)} onClose={handleClose}>
                <MenuItem>
                  <NavLinkItem to="/" label="Home" />
                </MenuItem>
                { loggedIn &&
                  <span>
                    <MenuItem>
                      <NavLinkItem to="/protected" label="Protected" />
                    </MenuItem>
                    <MenuItem>
                      <NavLinkItem to="/protected" label="SUBPAGE1" />
                      <span>Logged in as {email}</span>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/logout">Logout</Link>
                    </MenuItem>
                  </span>
                }
                { !loggedIn &&
                  <span>
                    <MenuItem>
                      <NavLinkItem to="/login" label="Login" />
                    </MenuItem>
                    <MenuItem>
                      <NavLinkItem to="/signup" label="Signup" />
                    </MenuItem>
                  </span>
                }
              </Menu>
            </Toolbar>
          </AppBar>
        </header>
      </div>
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  );
}

export default NavItems;