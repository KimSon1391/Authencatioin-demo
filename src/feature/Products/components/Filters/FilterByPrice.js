import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './filterByPrice.scss';

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChangePrice = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlerSubmitPrice = () => {
    if (onChange) onChange(values);

    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Box className="filter__price">
      <Typography variant="subtitle2">GiÁ</Typography>

      <Box className="filter__price__range">
        <TextField
          variant="standard"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChangePrice}
        />
        <span>-</span>
        <TextField
          variant="standard"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChangePrice}
        />
      </Box>

      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handlerSubmitPrice}
      >
        ÁP DỤNG
      </Button>
    </Box>
  );
}

export default FilterByPrice;
