import React from 'react';

import { useModal } from '../../hooks';

import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const ModalBase = ({ modalId, onClose, title, children }) => {
  const theme = useTheme();
  const { getModalState } = useModal();
  const state = getModalState(modalId);

  return (
    <Dialog open={state.isOpen} onClose={onClose} PaperProps={{ sx: sx.dialogPaperProps }} maxWidth={false}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h2" fontSize={theme.typography.font.XL} fontWeight={theme.typography.fontWeightRegular}>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

const sx = {
  dialogPaperProps: {
    width: '35%',
    px: 3,
    py: 2,
  },
};
