import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useTheme, Box, Divider, Skeleton, Typography, Button } from '@mui/material';

import { THEME } from '../theme';
import { MODALS } from '../constants';
import { useModal } from '../hooks';
import { getReviews } from '../api';
import { LanguageSwitchButtons, PrimaryButton } from '../components/common';
import { Review } from '../components/review';
import { CreateReviewModal } from '../components/modals';

const LIMIT = 2;

export const ReviewPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const theme = useTheme();

  const { t } = useTranslation();

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
    <Box position="relative">
      <Box position="absolute" top="1%" right="1%">
        <LanguageSwitchButtons />
      </Box>

      <Box width="70%" margin="auto" px={10} py={4}>
        <Typography
          variant="h2"
          fontSize={theme.typography.font.XL}
          fontWeight={theme.typography.fontWeightRegular}
          mb={2}
        >
          {t('pages.reviews.title')}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
          <PrimaryButton onClick={() => openModal(MODALS.REVIEW_FORM)} sx={sx.addReviewButton}>
            {t('pages.reviews.leaveReviewButton')}
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
              {t('messages.serverError')}
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column">
            {data?.reviews.length === 0 && page == 1 ? (
              <Typography variant="body1" sx={sx.noReviewsMessage}>
                {t('pages.reviews.noReviewsMessage')}
              </Typography>
            ) : (
              <React.Fragment>
                {data?.reviews.map(data => (
                  <Box key={data.id} mb={4} sx={isFetched ? undefined : sx.reviewsWrapperFetching}>
                    <Review {...data} />
                  </Box>
                ))}

                <Box display="flex" justifyContent="space-between">
                  <Box>
                    {page !== 1 && <Button onClick={() => setPage(page - 1)}>{t('buttons.paginationPrev')}</Button>}
                  </Box>
                  <Box display="flex" alignItems="center">
                    {hasNext && <Button onClick={() => setPage(page + 1)}>{t('buttons.paginationNext')}</Button>}
                  </Box>
                </Box>
              </React.Fragment>
            )}
          </Box>
        )}

        <CreateReviewModal />
      </Box>
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
