import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { THUMBNAIL_PLACEHOlDER } from 'constants/common';
import { STATIC_HOST } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

ProductItem.propTypes = {
  product: PropTypes.object,
};

function ProductItem({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOlDER;

  return (
    <Box padding={1}>
      <Box padding={1} minHeight="200px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="15px" fontWeight="bold" mr={1}>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default ProductItem;
