import React from 'react';

import { Button } from '@mui/material';
import { styled } from '@mui/system';

import AttachFileIcon from '@mui/icons-material/AttachFile';

const StyledFileUploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  border: `solid 1px ${theme.palette.grey[400]}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
  fontWeight: '400',
  fontSize: theme.typography.font.M,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

export const FileUploadButton = ({ label, onInput, isMultiple = false, ...props }) => {
  return (
    <StyledFileUploadButton component="label" startIcon={<AttachFileIcon />} {...props}>
      {label}
      <input
        type="file"
        hidden
        multiple={isMultiple}
        onChange={onInput}
        onClick={e => (e.target.value = null)}
      />
    </StyledFileUploadButton>
  );
};
