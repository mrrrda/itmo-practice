import React from 'react';
import { styled } from '@mui/material';
import MuiRadio, { type RadioProps as MuiRadioProps } from '@mui/material/Radio';

const RadioIcon = styled('span')(({ theme }) => ({
  width: '20px',
  height: '20px',
  backgroundColor: theme.palette.grey[50],
  borderRadius: '50%',
  border: `1px solid ${theme.palette.grey[400]}`,

  '.MuiRadio-root:hover &': {
    border: 'none',
    backgroundColor: theme.palette.primary.main,
  },

  '.MuiRadio-root.Mui-checked &': {
    backgroundColor: theme.palette.common.white,
    border: `6px solid ${theme.palette.primary.main}`,
  },

  '.MuiRadio-root.Mui-disabled &': {
    backgroundColor: theme.palette.grey[50],
    border: `6px solid ${theme.palette.grey[400]}`,
  },
}));

export const Radio: React.FC<MuiRadioProps> = props => (
  <MuiRadio icon={<RadioIcon />} checkedIcon={<RadioIcon />} {...props} />
);
