import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';

import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { LanguageSwitchButtons } from '../components/common';

export const CheckoutPage: React.FC = () => {
  const theme = useTheme();

  const { t } = useTranslation();

  return (
    <Box position="relative">
      <Box position="absolute" top="1%" right="1%">
        <LanguageSwitchButtons />
      </Box>

      <Box width="50%" margin="auto" px={10} py={4}>
        <Typography
          variant="h2"
          fontSize={theme.typography.font.XL}
          fontWeight={theme.typography.fontWeightRegular}
          mb={2}
        >
          {t('pages.checkout.title')}
        </Typography>
        <CheckoutForm />
      </Box>
    </Box>
  );
};
