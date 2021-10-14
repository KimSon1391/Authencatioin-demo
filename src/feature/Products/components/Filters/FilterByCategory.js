import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import './filterByCategory.scss';

FilterByCategory.propTypes = {
  onchange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategoryList(response.map((x) => ({ id: x.id, name: x.name })));
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category);
    }
  };

  return (
    <Box className="filter__category">
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      <ul className="filter__category__list">
        {categoryList.map((category) => (
          <li
            key={category.id}
            onClick={() => {
              handleCategoryClick(category);
            }}
          >
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
