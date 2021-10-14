import { Container, Grid, Pagination, Paper } from '@mui/material';
import { Box } from '@mui/system';
import productApi from 'api/productApi';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import FilterViews from '../components/Filters/FilterViews';
import ListProduct from '../components/ListProduct';
import ProductFilters from '../components/ProductFilters';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import './listProductPage.scss';

function ListProductPage(props) {
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 8,
    limit: 9,
    page: 1,
  });
  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 9,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  //   isPromotion: queryParams.isPromotion === 'true',
  //   isFreeShip: queryParams.isFreeShip === 'true',
  // }));

  //Sync filters to URL
  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  //Fetch data and pagination when filters change
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failded to fetch product list: ', error);
      }
      setIsLoading(false);
    })();
  }, [queryParams]);

  const handleChangePagination = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleChangeSort = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleChangeFilters = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className="products__list--left">
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleChangeFilters}
              />
            </Paper>
          </Grid>
          <Grid item className="products__list--right">
            <Paper elevation={0} className="products__list__wrap">
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleChangeSort}
              />
              <FilterViews filters={queryParams} onChange={setNewFilters} />

              {isLoading ? (
                <ProductSkeletonList length={8} />
              ) : (
                <ListProduct products={productList} />
              )}

              <Box className="products__list--pagination">
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handleChangePagination}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListProductPage;
