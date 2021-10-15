import { AccountCircle, Close, ShoppingCart } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
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
import { cartItemsCountSelector } from 'feature/Cart/selectors';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './headerbar.scss';

HeaderBar.propTypes = {};

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

function HeaderBar(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const loginState = useSelector((state) => state.user.current);
  const isLoggedIn = !!loginState.id;

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const cartItemCount = useSelector(cartItemsCountSelector);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());

    handleCloseMenu();
  };

  const handleCartClick = () => {
    history.push('/cart');
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
              <Button color="inherit" onClick={handleOpenDialog}>
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
                <NavLink className="link" to="/products">
                  <Button color="inherit">products</Button>
                </NavLink>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleCartClick}
                >
                  <Badge badgeContent={cartItemCount} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={handleOpenMenu}>
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
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        disableEscapeKeyDown
        onClick={(event, reason) => {
          if (reason === 'backdropClick') {
            setOpen(false);
          }
        }}
      >
        <IconButton className="close__button" onClick={handleCloseDialog}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleCloseDialog} />
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
              <Login closeDialog={handleCloseDialog} />
              <Box textAlign="center">
                <Button
                  color="primary"
                  onClick={() => {
                    setMode(MODE.REGISTER);
                  }}
                >
                  Do not have an account? Register here.
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
