import { useFormik } from 'formik';
import * as yup from 'yup';
import { formatISO } from 'date-fns';

import {
  useTheme,
  Box,
  TextField,
  Button,
  FormHelperText,
  Switch,
  FormControlLabel,
  Link,
  Typography,
  IconButton,
  FormControl,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { MODALS, SNACKBARS } from '../../../constants';
import { useModal, useSnackbar } from '../../../hooks';
import { base64FileEncoder } from '../../../utils';
import { postReviews } from '../../../api';

import { PrimaryButton, FileUploadButton } from '../../common';
import { LabeledRating } from './components';

const MAX_UPLOAD_FILES = 10;

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z\\.\s-]+$/, 'Invalid name')
    .trim()
    .required('Name is required'),
  email: yup.string().trim().required('Email is required').email('Invalid email'),

  ratings: yup.object().shape({
    serviceQuality: yup.number().min(1, 'Service quality rating is required'),
    productQuality: yup.number().min(1, 'Product quality rating is required'),
    deliveryQuality: yup.number().min(1, 'Delivery quality rating is required'),
  }),

  process: yup.boolean().oneOf([true], 'You must agree to have your personal data processed'),
});

export const ReviewForm = () => {
  const theme = useTheme();

  const { closeModal } = useModal();
  const { openSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      review: '',
      ratings: {
        serviceQuality: 0,
        productQuality: 0,
        deliveryQuality: 0,
      },
      process: false,
      files: [],
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        const date = formatISO(Date.now(), { representation: 'date' });
        const data = { ...values, date };

        await postReviews(data);

        formik.resetForm();

        openSnackbar(SNACKBARS.REVIEW_FORM, {
          severity: 'success',
          message: 'Review sent successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 4000,
        });

        closeModal(MODALS.REVIEW_FORM);
      } catch (e) {
        console.log('Error submitting form:', e);

        openSnackbar(SNACKBARS.REVIEW_FORM, {
          severity: 'error',
          message: 'Server error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 4000,
        });
      }
    },
  });

  const handleFileInput = async e => {
    let newFiles = Array.from(e.target.files);

    const totalFiles = formik.values.files.length + newFiles.length;

    if (totalFiles > MAX_UPLOAD_FILES) {
      newFiles = newFiles.slice(0, MAX_UPLOAD_FILES - formik.values.files.length);
      openSnackbar(SNACKBARS.REVIEW_FORM, {
        severity: 'error',
        message: `Maximum upload limit of ${MAX_UPLOAD_FILES} files reached`,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 4000,
      });
    }

    const existingFiles = formik.values.files.map(file => file.id);

    const duplicates = newFiles.filter(file => existingFiles.includes(file.name)).map(file => file.name);

    if (duplicates.length) {
      newFiles = newFiles.filter(file => !duplicates.includes(file.name));
      openSnackbar(SNACKBARS.REVIEW_FORM, {
        severity: 'error',
        message: 'Duplicate files are not allowed',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 4000,
      });
    }

    const base64Files = await Promise.all(
      newFiles.map(async file => {
        const base64 = await base64FileEncoder(file);
        return {
          id: file.name,
          name: file.name,
          src: base64,
        };
      }),
    );

    formik.setFieldValue('files', [...formik.values.files, ...base64Files]);
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }} autoComplete="off" noValidate>
      <Box mt={4}>
        <Box position="relative" mb={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            FormHelperTextProps={{ sx: sx.error }}
            fullWidth
          />
        </Box>

        <Box position="relative" mb={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            type="text"
            placeholder="example@domain.tld"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            FormHelperTextProps={{ sx: sx.error }}
            fullWidth
          />
        </Box>

        {/* TODO (L): Number conversion */}
        <FormControl
          error={
            formik.touched.ratings &&
            Boolean(
              formik.errors.ratings?.serviceQuality ||
                formik.errors.ratings?.productQuality ||
                formik.errors.ratings?.deliveryQuality,
            )
          }
          sx={sx.ratingsFormControl}
        >
          <FormControlLabel
            required
            label="Service quality"
            labelPlacement="top"
            control={
              <LabeledRating
                name="ratings.serviceQuality"
                value={Number(formik.values.ratings.serviceQuality)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            sx={sx.ratingsControlLabel}
          />
          <FormControlLabel
            required
            label="Product quality"
            labelPlacement="top"
            control={
              <LabeledRating
                name="ratings.productQuality"
                value={Number(formik.values.ratings.productQuality)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            sx={sx.ratingsControlLabel}
          />
          <FormControlLabel
            required
            label="Delivery quality"
            labelPlacement="top"
            control={
              <LabeledRating
                name="ratings.deliveryQuality"
                value={Number(formik.values.ratings.deliveryQuality)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            sx={sx.ratingsControlLabel}
          />

          {formik.touched.ratings &&
            (formik.errors.ratings?.serviceQuality ||
              formik.errors.ratings?.productQuality ||
              formik.errors.ratings?.deliveryQuality) && (
              <FormHelperText sx={sx.error}>All ratings are required</FormHelperText>
            )}
        </FormControl>

        {/* TODO (L): Text on label */}
        <Box mb={2}>
          <TextField
            multiline
            minRows={4}
            maxRows={8}
            id="review"
            name="review"
            label="Review"
            type="text"
            value={formik.values.review}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
        </Box>

        <Box position="relative" display="flex" flexDirection="column" mb={6}>
          <Box>
            <FileUploadButton
              label="Attach files"
              isMultiple={true}
              accept={'image/*'}
              onInput={handleFileInput}
              sx={sx.fileUploadButton}
            />
          </Box>
          <Box>
            {formik.values.files.map(({ id, name }) => (
              <Box
                key={id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                color={theme.palette.text.secondary}
                fontSize={theme.typography.font.XXS}
                fontWeight={theme.typography.fontWeightLight}
              >
                <Typography variant="body2">{name}</Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    formik.setFieldValue(
                      'files',
                      formik.values.files.filter(file => file.id !== id),
                    )
                  }
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          {formik.values.files.length > 1 && (
            <Button color="primary" sx={sx.deleteAllFilesButton} onClick={() => formik.setFieldValue('files', [])}>
              Delete All Files
            </Button>
          )}
        </Box>

        <Box position="relative" mb={3}>
          <FormControlLabel
            required
            control={
              <Switch
                name="process"
                checked={formik.values.process}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label={
              <Typography variant="span">
                Agree to have my <Link href="#">personal data</Link> processed
              </Typography>
            }
          />
          {formik.touched.process && formik.errors.process && (
            <FormHelperText error sx={sx.error}>
              {formik.errors.process}
            </FormHelperText>
          )}
        </Box>
        <PrimaryButton sx={sx.submitButton} type="submit" disabled={formik.isSubmitting}>
          Submit
        </PrimaryButton>
      </Box>
    </form>
  );
};

const sx = {
  ratingsFormControl: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    mb: 6,
  },

  ratingsControlLabel: { alignItems: 'flex-start', m: 0 },

  fileUploadButton: {
    width: '30%',
  },

  deleteAllFilesButton: theme => ({
    alignSelf: 'flex-end',
    fontSize: theme.typography.font.S,
    fontWeight: theme.typography.fontWeightRegular,
    textTransform: 'none',
    p: 0,
  }),

  error: theme => ({
    position: 'absolute',
    top: '-2em',
    right: 0,
    fontSize: theme.typography.font.XS,
    m: 0,
  }),

  submitButton: {
    width: '20%',
  },
};
