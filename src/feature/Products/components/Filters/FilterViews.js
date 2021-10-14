import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import './filterViews.scss';
import { Chip } from '@mui/material';

FilterViews.propTypes = {
  onchange: PropTypes.func,
  filters: PropTypes.object,
};

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: (filters) => 'Có khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_lte} đến ${filters.salePrice_gte} `,
    isActive: () => true,
    isVisible: (filters) =>
      Number.parseInt(filters.salePrice_lte) > 0 &&
      Number.parseInt(filters.salePrice_gte) > 0 &&
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (filters) => `${filters['category.name']}`,
    isActive: () => true,
    isVisible: (filters) => filters['category.name'],
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.name'];
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: () => {},
  },
];

function FilterViews({ filters = {}, onChange = null }) {
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className="filter__view__list">
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            size="small"
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViews;
