import React from 'react';

import { Rating, Box, Typography, FormLabel } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export const RatingItem = ({ label, value, isRequired = false, onChange, isReadOnly = false }) => {
  const [hover, setHover] = React.useState(-1);

  const marks = {
    0: 'No rating',
    1: 'Awful',
    2: 'Poor',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
  };

  return (
    <Box>
      <FormLabel required={isRequired} sx={sx.label}>
        {label}
      </FormLabel>

      <Box display="flex">
        <Rating
          value={value}
          readOnly={isReadOnly}
          onChange={(_, value) => {
            if (!isReadOnly && onChange) {
              onChange(value || 0);
            }
          }}
          onChangeActive={(_, hover) => {
            setHover(hover);
          }}
          emptyIcon={<StarIcon />}
          onMouseLeave={() => {
            if (!isReadOnly) {
              setHover(-1);
            }
          }}
        />
        {!isReadOnly && (
          <Box flex>
            <Typography color="textSecondary" component="span" variant="body2" ml={2}>
              —
            </Typography>
            <Typography color="textSecondary" component="span" variant="body2" ml={2}>
              {hover !== -1 ? marks[hover] : marks[value]}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const sx = {
  label: theme => ({
    fontSize: theme.typography.font.S,
  }),
};
