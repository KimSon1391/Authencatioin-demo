import { Box } from '@mui/system';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListProductPage from './pages/ListProductPage';
import ProductDetail from './pages/ProductDetail';

function ProductFeature(props) {
  const match = useRouteMatch();

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListProductPage} />
        <Route path={`${match.url}/:productId`} component={ProductDetail} />
      </Switch>
      ;
    </Box>
  );
}

export default ProductFeature;
