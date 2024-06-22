import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { CheckoutForm } from '../components/checkout/CheckoutForm';

export const CheckoutPage = () => {
  const theme = useTheme();

  return (
    <Box width="50%" margin="auto" px={10} py={4}>
      <Typography
        variant="h2"
        fontSize={theme.typography.font.XL}
        fontWeight={theme.typography.fontWeightRegular}
        mb={2}
      >
        Checkout
      </Typography>

      <CheckoutForm />
    </Box>
  );
};
