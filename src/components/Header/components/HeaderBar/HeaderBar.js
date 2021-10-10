import { AccountCircle, Close } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from 'feature/Auth/components/Login/Login';
import Register from 'feature/Auth/components/Register/Register';
import { logout } from 'feature/Auth/userSlice';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './headerbar.scss';

HeaderBar.propTypes = {};

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

function HeaderBar(props) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const loginState = useSelector((state) => state.user.current);
  const isLoggedIn = !!loginState.id;

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());

    handleMenuClose();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <CodeIcon sx={{ mr: 3 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" className="link">
                Authentication
              </Link>
            </Typography>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            )}
            {isLoggedIn && (
              <>
                <NavLink className="link" to="/todo">
                  <Button color="inherit">Todo</Button>
                </NavLink>
                <NavLink className="link" to="/album">
                  <Button color="inherit">Album</Button>
                </NavLink>
                <IconButton color="inherit" onClick={handleMenuClick}>
                  <AccountCircle />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown
        onClick={(event, reason) => {
          if (reason === 'backdropClick') {
            setOpen(false);
          }
        }}
      >
        <IconButton className="close__button" onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
              <Box textAlign="center">
                <Button
                  color="primary"
                  onClick={() => {
                    setMode(MODE.LOGIN);
                  }}
                >
                  Already have an account? Login here.
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
              <Box textAlign="center">
                <Button
                  color="primary"
                  onClick={() => {
                    setMode(MODE.REGISTER);
                  }}
                >
                  Already have an account? Login here.
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default HeaderBar;
