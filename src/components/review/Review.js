import React from 'react';
import { useTheme } from '@emotion/react';

import { Avatar, Box, Typography, ImageList, ImageListItem } from '@mui/material';
import { format } from 'date-fns';

// TODO: Import from '.'?
import { RatingItem } from './RatingItem';

export const Review = ({ name, date, ratings, review, files }) => {
  const theme = useTheme();

  const formattedDate = format(new Date(date), 'dd.MM.yyyy');

  const { serviceQuality, productQuality, deliveryQuality } = ratings;
  const averageRating = Math.round((serviceQuality + productQuality + deliveryQuality) / 3);

  return (
    <Box
      display="flex"
      border={`solid 1px ${theme.palette.grey[400]}`}
      borderRadius={theme.shape.borderRadius}
      px={4}
      py={3}
    >
      <Avatar sx={sx.avatar} />

      <Box flexGrow={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography
              variant="subtitle1"
              fontSize={theme.typography.font.S}
              color={theme.palette.grey[400]}
            >
              {formattedDate}
            </Typography>
            <Typography variant="h6">{name}</Typography>
          </Box>
          <RatingItem label="" value={averageRating} isReadOnly={true} />
        </Box>

        <Box width="35%" display="flex" justifyContent="space-between" mb={3}>
          <RatingItem label="Service quality" value={serviceQuality} isReadOnly={true} />
          <RatingItem label="Product quality" value={productQuality} isReadOnly={true} />
          <RatingItem label="Delivery quality" value={deliveryQuality} isReadOnly={true} />
        </Box>

        {review && (
          <Typography variant="body1" color={theme.palette.text.secondary}>
            {review}
          </Typography>
        )}

        {/* TODO */}
        {files && files.length > 0 && (
          <ImageList sx={sx.imageList} cols={files.length} gap={20}>
            {files.map(item => (
              <ImageListItem key={item.id} sx={sx.imageItem}>
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  style={{ maxWidth: '400px', maxHeight: '200px' }}
                />
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
