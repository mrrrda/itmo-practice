import React from 'react';
import { styled } from '@mui/material';
import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { InputHTMLAttributes } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';

type FileUploadButtonProps = Omit<MuiButtonProps, 'onInput'> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'multiple' | 'accept'> & {
    label: MuiButtonProps['children'];
    onInput: InputHTMLAttributes<HTMLInputElement>['onChange'];
  };

const Button = styled(MuiButton)(({ theme }) => ({
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

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  label,
  multiple = false,
  accept,
  onInput,
  ...props
}) => {
  return (
    <Button component="label" startIcon={<AttachFileIcon />} {...props}>
      {label}
      <input
        type="file"
        hidden
        multiple={multiple}
        accept={accept}
        onChange={onInput}
        onClick={e => ((e.target as HTMLInputElement).value = '')}
      />
    </Button>
  );
};
