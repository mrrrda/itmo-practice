import React from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ModalsContext } from '../providers';

import { AppData } from '../AppData';

import { PrimaryButton } from '../components/common';
import { Review } from '../components/review';
import { ReviewForm } from '../components/review';

export const ReviewPage = () => {
  const theme = useTheme();

  const [reviews, setReviews] = React.useState([]);
  const { open, close, getState } = React.useContext(ModalsContext);

  // TODO: Rerender on every reviews array change
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box px={10} py={4}>
      <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
        <PrimaryButton onClick={() => open(AppData.REVIEW_FORM)} sx={sx.addReviewButton}>
          Leave Review
        </PrimaryButton>
        <Divider sx={sx.divider} />
      </Box>

      <Box>
        {reviews.map(data => (
          <Box key={data.id} mb={4}>
            <Review {...data} />
          </Box>
        ))}
      </Box>

      {getState(AppData.REVIEW_FORM)?.isOpen && (
        <Dialog
          open={true}
          onClose={() => close(AppData.REVIEW_FORM)}
          PaperProps={{ sx: sx.dialogPaperProps }}
          maxWidth={false}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="h2"
                fontSize={theme.typography.font.L}
                fontWeight={theme.typography.fontWeightRegular}
              >
                Leave your Review
              </Typography>
              <IconButton onClick={() => close(AppData.REVIEW_FORM)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent>
            <ReviewForm />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

const sx = {
  addReviewButton: {
    width: '10%',
  },

  dialogPaperProps: {
    width: '35%',
    px: 3,
    py: 2,
  },

  divider: theme => ({
    flexGrow: 1,
    borderColor: theme.palette.grey[400],
    ml: 6,
  }),
};
