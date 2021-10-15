import { Link } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import './productMenu.scss';

ProductMenu.propTypes = {};

function ProductMenu(props) {
  const { url } = useRouteMatch();

  return (
    <Box component="ul" className="product__menu">
      <li>
        <Link component={NavLink} to={url} exact>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          Additional Infomation
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
