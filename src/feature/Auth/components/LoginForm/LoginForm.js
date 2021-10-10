import { yupResolver } from '@hookform/resolvers/yup';
import { LooksOutlined } from '@mui/icons-material';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import InputField from 'components/FormControl/InputField/InputField';
import PasswordField from 'components/FormControl/PasswordField/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './loginForm.scss';

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter valid email.'),

    password: yup.string().required('Please enter your password.'),
  });

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
    <div className="login__form">
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
        Sign In
      </Typography>

      <form onSubmit={form.handleSubmit(submitHandler)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          sx={{ marginTop: '20px' }}
          disabled={isSubmitting}
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
