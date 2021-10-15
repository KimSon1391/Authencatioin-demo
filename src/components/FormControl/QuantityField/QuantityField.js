import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function QuantityField(props) {
  const { form, name, label } = props;
  const { control, setValue } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <>
          <FormControl
            error={invalid}
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
          >
            <Typography>{label}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '250px',
                marginTop: '15px',
              }}
            >
              <IconButton
                onClick={() =>
                  setValue(
                    name,
                    Number.parseInt(value) ? Number.parseInt(value - 1) : 1
                  )
                }
              >
                <RemoveCircleOutline />
              </IconButton>

              <OutlinedInput
                id={name}
                type="number"
                value={value}
                error={invalid}
                onChange={onChange}
                onBlur={onBlur}
              />

              <IconButton
                onClick={() =>
                  setValue(
                    name,
                    Number.parseInt(value) ? Number.parseInt(value + 1) : 1
                  )
                }
              >
                <AddCircleOutline />
              </IconButton>
            </Box>
          </FormControl>
          <FormHelperText error={invalid}>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
}

export default QuantityField;
