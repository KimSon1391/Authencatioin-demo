import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from 'utils';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;

  return (
    <Box sx={{ paddingBottom: '16px', borderBottom: '1px solid #aaaaaa64' }}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" sx={{ margin: '20px 0' }}>
        {shortDescription}
      </Typography>

      <Box sx={{ padding: '16px', bgcolor: '#aaaaaa32' }}>
        <Box
          component="span"
          sx={{ fontSize: '26px', marginRight: '24px', fontWeight: 'bold' }}
        >
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box
              component="span"
              sx={{ marginRight: '24px', textDecoration: 'line-through' }}
            >
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span">{`-${product.promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
