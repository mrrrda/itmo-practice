import React from 'react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import type { DialogProps, TypographyProps, DialogContentProps, IconButtonProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useModal } from '../../hooks';

type ModalBaseProps = Pick<DialogProps, 'onClose' | 'PaperProps' | 'maxWidth'> & {
  modalId: string;
  title: TypographyProps['children'];
  children: DialogContentProps['children'];
};

export const ModalBase: React.FC<ModalBaseProps> = ({ modalId, onClose, title, children }) => {
  const theme = useTheme();
  const { getModalState } = useModal();
  const state = getModalState(modalId);

  return (
    <Dialog open={state.isOpen} onClose={onClose} PaperProps={paperProps} maxWidth={false}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h2" fontSize={theme.typography.font.XL} fontWeight={theme.typography.fontWeightRegular}>
            {title}
          </Typography>
          <IconButton onClick={onClose as IconButtonProps['onClick']}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

const paperProps = {
  sx: { width: '35%', px: 3, py: 2 },
};
