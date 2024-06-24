import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useTheme, Box, Divider, Skeleton, Typography, Button } from '@mui/material';

import { THEME } from '../theme';
import { MODALS } from '../constants';
import { useModal } from '../hooks';
import { getReviews } from '../api';
import { PrimaryButton } from '../components/common';
import { Review } from '../components/review';
import { CreateReviewModal } from '../components/modals';

const LIMIT = 2;

export const ReviewPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const theme = useTheme();
  const { openModal } = useModal();

  const { isLoading, isError, data, isFetched } = useQuery(
    ['reviews', page, LIMIT],
    () => getReviews({ page, limit: LIMIT }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  );

  const hasNext = data?.totalCount && data.totalCount > page * LIMIT;

  return (
    <Box width="70%" margin="auto" px={10} py={4}>
      <Typography
        variant="h2"
        fontSize={theme.typography.font.XL}
        fontWeight={theme.typography.fontWeightRegular}
        mb={2}
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
          {[0, 0, 0].map((_, index) => (
            <Skeleton key={index} variant="rounded" width="100%" height="250px" sx={sx.skeleton} />
          ))}
        </Box>
      ) : isError ? (
        <Box display="flex" justifyContent="center">
          <Typography variant="body1" color="error" textAlign="center">
            Error fetching reviews
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column">
          {data?.reviews.length === 0 && page == 1 ? (
            <Typography variant="body1" sx={sx.noReviewsMessage}>
              No reviews yet. Be the first to leave a review!
            </Typography>
          ) : (
            data?.reviews.map(data => (
              <Box key={data.id} mb={4} sx={isFetched ? undefined : sx.reviewsWrapperFetching}>
                <Review {...data} />
              </Box>
            ))
          )}

          <Box display="flex" justifyContent="space-between">
            <Box>{page !== 1 && <Button onClick={() => setPage(page - 1)}>Prev</Button>}</Box>
            <Box>
              <Box display="flex" alignItems="center">
                {hasNext && <Button onClick={() => setPage(page + 1)}>Next</Button>}
              </Box>
            </Box>
          </Box>
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

  divider: {
    flexGrow: 1,
    borderColor: THEME.palette.grey[400],
    ml: 6,
  },

  skeleton: { mb: 4 },

  reviewsWrapperFetching: {
    opacity: 0.5,
  },

  noReviewsMessage: { alignSelf: 'center' },
};
