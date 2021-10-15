import axiosClient from './axiosClient';

const productApi = {
  async getAll(params) {
    //Transform _page to _start
    const newParams = { ...params };
    newParams._start =
      !newParams._page || newParams._page < 0
        ? 0
        : (newParams._page - 1) * (newParams._limit || 50);

    //Remove un-needed key
    delete newParams._page;

    //Fetch producs List + count
    const productList = await axiosClient.get('/products', {
      params: newParams,
    });
    const count = await axiosClient.get('/products/count', {
      params: newParams,
    });

    //Return Response
    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
