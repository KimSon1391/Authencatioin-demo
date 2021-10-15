import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  const safeInnerHtml = DOMPurify.sanitize(product.description);

  return (
    <Paper elevation={0} sx={{ padding: '15px' }}>
      <div dangerouslySetInnerHTML={{ __html: safeInnerHtml }} />
    </Paper>
  );
}

export default ProductDescription;
