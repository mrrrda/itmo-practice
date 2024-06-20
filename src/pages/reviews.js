import React from 'react';
import { useQuery } from 'react-query';

import { useTheme, Box, Button, Divider, Skeleton, Typography } from '@mui/material';

import { MODALS } from '../constants';
import { useModal } from '../hooks';

import { PrimaryButton } from '../components/common';
import { Review } from '../components/review';
import { CreateReviewModal } from '../components/modals';

const fetchReviews = async () => {
  const response = await fetch('http://localhost:3001/reviews');
  return await response.json();
};

// TODO: Pagination
export const ReviewPage = () => {
  const theme = useTheme();
  const { openModal } = useModal();

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery('reviews', fetchReviews, {
    refetchOnWindowFocus: false,
  });

  return (
    <Box width="70%" margin="auto" px={10} py={4}>
      <Typography
        variant="h2"
        fontSize={theme.typography.font.XL}
        fontWeight={theme.typography.fontWeightRegular}
        mb={4}
      >
        Reviews
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
        <PrimaryButton onClick={() => openModal(MODALS.REVIEW_FORM)} sx={sx.addReviewButton}>
          Leave Review
        </PrimaryButton>
        <Divider sx={sx.divider} />
      </Box>

      {isLoading ? (
        <Box>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} variant="rounded" width="100%" height="250px" sx={sx.skeleton} />
          ))}
        </Box>
      ) : error ? (
        <Box display="flex" justifyContent="center">
          <Typography variant="body1" color="error" textAlign="center">
            Error fetching reviews
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column">
          {reviews.length === 0 ? (
            <Typography variant="body1" sx={sx.noReviewsMessage}>
              No reviews yet. Be the first to leave a review!
            </Typography>
          ) : (
            reviews.map(data => (
              <Box key={data.id} mb={4}>
                <Review {...data} />
              </Box>
            ))
          )}
        </Box>
      )}

      <CreateReviewModal />
    </Box>
  );
};

const sx = {
  addReviewButton: {
    width: '15%',
  },

  divider: theme => ({
    flexGrow: 1,
    borderColor: theme.palette.grey[400],
    ml: 6,
  }),

  skeleton: { mb: 4 },

  noReviewsMessage: { alignSelf: 'center' },
};
