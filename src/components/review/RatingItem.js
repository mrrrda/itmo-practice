import React from 'react';
import { Rating, Box, Typography } from '@mui/material';

export const RatingItem = ({ label, value }) => (
  <Box>
    <Typography variant="body2" color="textSecondary">
      {label}
    </Typography>
    <Rating value={value} readOnly />
  </Box>
);
