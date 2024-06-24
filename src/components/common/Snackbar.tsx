import React from 'react';
import { styled } from '@mui/material';
import MuiAlert, { type AlertProps as MuiAlertProps } from '@mui/material/Alert';
import MuiSnackbar, { type SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';

export type SnackbarProps = MuiSnackbarProps &
  Pick<MuiAlertProps, 'severity' | 'onClose'> & {
    message: MuiAlertProps['children'];
  };

const Alert = styled(MuiAlert)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: '1rem',

  fontSize: theme.typography.font.XS,

  '.MuiAlert-icon, .MuiAlert-message, .MuiAlert-action': {
    padding: 0,
    margin: 0,
  },
}));

export const Snackbar: React.FC<SnackbarProps> = ({ open, onClose, severity, message, ...props }) => (
  <MuiSnackbar open={open} onClose={onClose} {...props}>
    <Alert severity={severity} variant="filled" onClose={onClose}>
      {message}
    </Alert>
  </MuiSnackbar>
);
