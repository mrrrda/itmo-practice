import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Rating, Typography } from '@mui/material';
import type { RatingProps } from '@mui/material';

type LabeledRatingType = RatingProps;

export const LabeledRating: React.FC<LabeledRatingType> = ({ name, value = 0, onChange, onBlur, ...props }) => {
  const [hover, setHover] = useState(-1);

  const { t, i18n } = useTranslation();
  const marks: string[] = useMemo(() => t('misc.marks', { returnObjects: true }), [i18n.language]);

  const idx = hover !== -1 ? hover : Number(value);

  return (
    <Box display="flex">
      <Rating
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onChangeActive={(_, hover) => setHover(hover)}
        onMouseLeave={() => setHover(-1)}
        {...props}
      />
      <Box display="flex">
        <Typography color="textSecondary" component="span" variant="body2" ml={2}>
          —
        </Typography>
        <Typography color="textSecondary" component="span" variant="body2" ml={2}>
          {marks[idx]}
        </Typography>
      </Box>
    </Box>
  );
};
