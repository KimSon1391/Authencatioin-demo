import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import QuantityField from 'components/FormControl/QuantityField/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minium value is 1')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const submitHandler = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button
        sx={{ marginTop: '15px', maxWidth: '250px' }}
        fullWidth
        size="large"
        variant="contained"
        type="submit"
        color="primary"
      >
        Buy
      </Button>
    </form>
  );
}

export default AddToCartForm;
