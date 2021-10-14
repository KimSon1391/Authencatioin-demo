import { Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

ProductSort.propTypes = {
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (e, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Tabs
      value={currentSort}
      onChange={handleSortChange}
      textColor="primary"
      indicatorColor="primary"
    >
      <Tab value="salePrice:ASC" label="Giá thấp đến cao" />
      <Tab value="salePrice:DESC" label="Giá cao xuống thấp" />
    </Tabs>
  );
}

export default ProductSort;
