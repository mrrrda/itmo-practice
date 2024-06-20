import React from 'react';

import { Box, Rating, Typography } from '@mui/material';

const marks = {
  0: 'No rating',
  1: 'Awful',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

export const LabeledRating = ({ value, onChange, ...props }) => {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box display="flex">
      <Rating
        value={value}
        onChange={(_, value) => onChange(value || 0)}
        onChangeActive={(_, hover) => setHover(hover)}
        onMouseLeave={() => setHover(-1)}
        {...props}
      />
      <Box display="flex">
        <Typography color="textSecondary" component="span" variant="body2" ml={2}>
          —
        </Typography>
        <Typography color="textSecondary" component="span" variant="body2" ml={2}>
          {marks[hover !== -1 ? hover : value]}
        </Typography>
      </Box>
    </Box>
  );
};
