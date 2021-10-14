import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  //Category Change Filter
  const handlerCategoryChange = (newCategory) => {
    if (!onChange) return;

    const newFilters = {
      'category.name': newCategory.name,
      'category.id': newCategory.id,
    };

    onChange(newFilters);
  };

  //Price Change Filter
  const handleChange = (values) => {
    console.log(filters);
    if (onChange) onChange(values);
  };

  return (
    <Box sx={{ padding: '24px' }}>
      <FilterByCategory onChange={handlerCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService onChange={handleChange} filters={filters} />
    </Box>
  );
}

export default ProductFilters;
