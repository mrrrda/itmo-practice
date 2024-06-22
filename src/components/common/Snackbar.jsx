import { styled } from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import MuiSnackbar from '@mui/material/Snackbar';

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

export const Snackbar = ({ open, onClose, severity, message, ...props }) => (
  <MuiSnackbar open={open} onClose={onClose} {...props}>
    <Alert severity={severity} variant="filled" onClose={onClose}>
      {message}
    </Alert>
  </MuiSnackbar>
);
