import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import ProductItem from './ProductItem';

ListProduct.propTypes = {
  products: PropTypes.array,
};

ListProduct.defaultProps = {
  products: [],
};

function ListProduct({ products }) {
  // console.log('PRODUCTS: ', products);

  return (
    <Box>
      <Grid container>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ListProduct;
