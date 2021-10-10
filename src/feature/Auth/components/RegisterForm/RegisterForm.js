import { yupResolver } from '@hookform/resolvers/yup';
import { LooksOutlined } from '@mui/icons-material';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import InputField from 'components/FormControl/InputField/InputField';
import PasswordField from 'components/FormControl/PasswordField/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './registerForm.scss';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function RegisterForm(props) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your fullname.')
      .test(
        'should have at least 2 words',
        'Your fullname need at least 2 words',
        (value) => value.split(' ').length >= 2
      ),

    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter valid email.'),

    password: yup
      .string()
      .required('Please enter your password.')
      .min(6, 'Password must at least 6 characters'),

    retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match.'),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const submitHandler = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="register__form">
      {isSubmitting && (
        <LinearProgress
          sx={{ position: 'absolute', top: '0', left: '0', right: '0' }}
        />
      )}

      <Avatar
        sx={{
          margin: '0 auto',
          backgroundColor: 'red',
        }}
      >
        <LooksOutlined />
      </Avatar>

      <Typography
        sx={{
          textAlign: 'center',
          margin: '12px 0 24px 0',
          fontSize: '30px',
        }}
      >
        Create An Account
      </Typography>

      <form onSubmit={form.handleSubmit(submitHandler)}>
        <InputField name="fullName" label="FullName" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField
          name="retypePassword"
          label="Retype Password"
          form={form}
        />
        <Button
          sx={{ marginTop: '20px' }}
          disabled={isSubmitting}
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          color="primary"
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
