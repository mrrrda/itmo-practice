import React from 'react';

import { format } from 'date-fns';

import {
  useTheme,
  Avatar,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Rating,
  FormControl,
  FormControlLabel,
} from '@mui/material';

export const Review = ({ name, date, ratings, review, files }) => {
  const theme = useTheme();

  const formattedDate = format(new Date(date), 'dd.MM.yyyy');

  const { serviceQuality, productQuality, deliveryQuality } = ratings;
  const averageRating = Math.round((serviceQuality + productQuality + deliveryQuality) / 3);

  return (
    <Box display="flex" border={`solid 1px ${theme.palette.grey[400]}`} borderRadius={theme.shape.borderRadius} p={4}>
      <Avatar sx={sx.avatar} />

      <Box flexGrow={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="subtitle1" fontSize={theme.typography.font.S} color={theme.palette.grey[400]}>
              {formattedDate}
            </Typography>
            <Typography variant="h6">{name}</Typography>
          </Box>

          <Rating value={averageRating} readOnly />
        </Box>

        {/* TODO (L): Number convertion */}
        <FormControl sx={sx.ratingsFormControl}>
          <FormControlLabel
            label="Service quality"
            labelPlacement="top"
            control={<Rating value={Number(serviceQuality)} readOnly />}
            sx={sx.ratingsControlLabel}
          />

          <FormControlLabel
            label="Product quality"
            labelPlacement="top"
            control={<Rating value={Number(productQuality)} readOnly />}
            sx={sx.ratingsControlLabel}
          />

          <FormControlLabel
            label="Delivery quality"
            labelPlacement="top"
            control={<Rating value={Number(deliveryQuality)} readOnly />}
            sx={sx.ratingsControlLabel}
          />
        </FormControl>

        {review && (
          <Typography variant="body1" color={theme.palette.text.secondary}>
            {review}
          </Typography>
        )}

        {files && files.length > 0 && (
          <ImageList sx={sx.imageList} cols={files.length} gap={20}>
            {files.map(item => (
              <ImageListItem key={item.id} sx={sx.imageItem}>
                <img src={item.src} alt="" loading="lazy" style={{ maxWidth: '400px', maxHeight: '200px' }} />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Box>
  );
};

const sx = {
  avatar: {
    width: '54px',
    height: '54px',
    mr: 4,
  },

  ratingsFormControl: {
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    mb: 3,
  },

  ratingsControlLabel: {
    cursor: 'default',
    m: 0,
  },

  imageList: {
    display: 'flex',
    overflowX: 'auto',
    mt: 2,
    mb: 0,
  },

  imageItem: {
    flexShrink: 0,
  },
};
