import { styled } from '@mui/system';

import MuiButton from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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

export const FileUploadButton = ({ label, isMultiple = false, accept, onInput, ...props }) => {
  return (
    <Button component="label" startIcon={<AttachFileIcon />} {...props}>
      {label}
      <input
        type="file"
        hidden
        multiple={isMultiple}
        accept={accept}
        onChange={onInput}
        onClick={e => (e.target.value = null)}
      />
    </Button>
  );
};
