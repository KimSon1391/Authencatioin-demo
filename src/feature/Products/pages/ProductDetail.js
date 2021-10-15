import { Container, Grid, LinearProgress, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { addToCart } from 'feature/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';
import './productDetail.scss';

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetail(productId);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box sx={{ position: 'fixed', top: '0', left: '0', width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = (formvalues) => {
    dispatch(
      addToCart({
        id: product.id,
        product,
        quantity: formvalues.quantity,
      })
    );
  };

  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className="products__detail--left">
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className="products__detail--right">
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>
          <Route
            exact
            path={`${url}/additional`}
            component={ProductAdditional}
          />
          <Route exact path={`${url}/reviews`} component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  );
}

export default ProductDetail;
