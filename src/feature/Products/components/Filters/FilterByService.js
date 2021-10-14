import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import './filterByService.scss';

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

function FilterByService({ onChange, filters = {} }) {
  const handleChangeService = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;
    onChange({
      [name]: checked,
    });
  };

  const services = [
    { value: 'isPromotion', label: 'Có khuyến mãi' },
    { value: 'isFreeShip', label: 'Miễn phí vận chuyển' },
  ];

  return (
    <Box className="filter__service">
      <Typography sx={{ margin: '10px 0' }} variant="subtitle2">
        DỊCH VỤ
      </Typography>
      <ul className="filter__service__list">
        {services.map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChangeService}
                  name={service.value}
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}
export default FilterByService;
