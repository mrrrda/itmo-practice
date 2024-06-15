import { Button, styled } from '@mui/material';

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: '0.375rem 1rem',

  ':hover': {
    backgroundColor: theme.palette.primary.main,
  },

  ':disabled': {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.grey[400],
  },
}));

// TODO: Ripple on hover
