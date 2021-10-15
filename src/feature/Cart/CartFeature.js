import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils/index';
import { cartTotalPriceSelector } from './selectors';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalPriceSelector);

  return <div>Cart Feature {formatPrice(cartTotal)}</div>;
}

export default CartFeature;
