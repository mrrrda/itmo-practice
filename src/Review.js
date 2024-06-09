import React from 'react';
import { Avatar, Box, Typography, Paper, Rating, ImageList, ImageListItem } from '@mui/material';
import { format } from 'date-fns';

const RatingItem = ({ label, value }) => (
  <Box>
    <Typography variant="body2" color="textSecondary">
      {label}
    </Typography>
    <Rating value={value} readOnly />
  </Box>
);

export const Review = ({ avatarUrl, name, date, ratings, review, images }) => {
  const formattedDate = format(new Date(date), 'dd.MM.yyyy');

  const { serviceQuality, productQuality, deliveryQuality } = ratings;
  const averageRating = Math.round((serviceQuality + productQuality + deliveryQuality) / 3);

  return (
    <Paper
      elevation={0}
      sx={{
        border: 'solid 1px #B6B5B5',
        borderRadius: '3px',
        py: 2,
        px: 4,
        display: 'flex',
      }}
    >
      <Avatar src={avatarUrl} alt={name[0]} sx={{ mr: 2, width: '54px', height: '54px' }} />

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontSize: '0.8rem', color: '#B6B5B5' }}>
              {formattedDate}
            </Typography>
            <Typography variant="h6">{name}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <RatingItem label="" value={averageRating} size="large" />
        </Box>

        <Box sx={{ width: '35%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <RatingItem label="Quality of service" value={serviceQuality} />
          <RatingItem label="Product quality" value={productQuality} />
          <RatingItem label="Delivery quality" value={deliveryQuality} />
        </Box>

        <Typography variant="body1" color="textSecondary">
          {review}
        </Typography>

        {images && images.length > 0 && (
          <ImageList
            sx={{
              display: 'flex',
              overflowX: 'auto',
            }}
            cols={images.length}
            gap={20}
          >
            {images.map(item => (
              <ImageListItem key={item.id} sx={{ flexShrink: 0 }}>
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
