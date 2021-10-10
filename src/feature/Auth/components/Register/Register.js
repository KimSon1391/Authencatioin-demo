import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'feature/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm/RegisterForm';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      //auto set userName = email
      values.username = values.email;

      //Dispatch register
      const resultAction = await dispatch(register(values));
      const user = unwrapResult(resultAction);

      //close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      //register successfully
      console.log('New User:', user);
      enqueueSnackbar('Regiter Successfully!!', { variant: 'success' });
    } catch (error) {
      //register failed
      console.log('Faild to register: ', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
