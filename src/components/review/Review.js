import React from 'react';
import { Avatar, Box, Typography, Paper, ImageList, ImageListItem } from '@mui/material';
import { format } from 'date-fns';

import { RatingItem } from './RatingItem';

export const Review = ({ avatarUrl, name, date, ratings, review, images }) => {
  const formattedDate = format(new Date(date), 'dd.MM.yyyy');

  const { serviceQuality, productQuality, deliveryQuality } = ratings;
  const averageRating = Math.round((serviceQuality + productQuality + deliveryQuality) / 3);

  return (
    <Paper elevation={0} sx={sx.paper}>
      <Avatar src={avatarUrl} alt={name[0]} sx={sx.avatar} />

      <Box>
        <Box sx={sx.header}>
          <Box>
            <Typography variant="subtitle1" sx={sx.date}>
              {formattedDate}
            </Typography>
            <Typography variant="h6">{name}</Typography>
          </Box>
          <Box sx={sx.averageRating} />
          <RatingItem label="" value={averageRating} size="large" />
        </Box>

        <Box sx={sx.ratings}>
          <RatingItem label="Quality of service" value={serviceQuality} />
          <RatingItem label="Product quality" value={productQuality} />
          <RatingItem label="Delivery quality" value={deliveryQuality} />
        </Box>

        <Typography variant="body1" color="textSecondary">
          {review}
        </Typography>

        {images && images.length > 0 && (
          <ImageList sx={sx.imageList} cols={images.length} gap={20}>
            {images.map(item => (
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
    </Paper>
  );
};

const sx = {
  paper: {
    border: 'solid 1px #B6B5B5',
    borderRadius: '3px',
    py: 2,
    px: 4,
    display: 'flex',
  },
  avatar: { mr: 2, width: '54px', height: '54px' },
  header: { display: 'flex', alignItems: 'center', mb: 2 },
  date: { fontSize: '0.8rem', color: '#B6B5B5' },
  ratings: { width: '35%', display: 'flex', justifyContent: 'space-between', mb: 2 },
  averageRating: { flexGrow: 1 },
  imageList: { display: 'flex', overflowX: 'auto' },
  imageItem: { flexShrink: 0 },
};
