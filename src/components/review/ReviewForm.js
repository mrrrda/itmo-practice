import React from 'react';
import { useTheme } from '@emotion/react';

import { useFormik } from 'formik';
import { formatISO } from 'date-fns';
import * as yup from 'yup';

import {
  Box,
  TextField,
  Button,
  FormHelperText,
  Switch,
  FormControlLabel,
  Link,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  FormLabel,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { ModalsContext } from '../../providers';

import { AppData } from '../../AppData';

import { RatingItem } from './RatingItem';
import { PrimaryButton } from '../common';
import { FileUploadButton } from '../common';

// TODO: Store in component / app constants?
const MAX_UPLOAD_FILES = 10;

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  ratings: yup.object().shape({
    serviceQuality: yup.number().min(1, 'Service quality rating is required'),
    productQuality: yup.number().min(1, 'Product quality rating is required'),
    deliveryQuality: yup.number().min(1, 'Delivery quality rating is required'),
  }),
  process: yup.boolean().oneOf([true], 'You must agree to have your personal data processed'),
});

export const ReviewForm = () => {
  const theme = useTheme();

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const { _, close, getState } = React.useContext(ModalsContext);

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

        await fetch('http://localhost:3001/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        formik.resetForm();

        if (getState(AppData.REVIEW_FORM)?.isOpen) {
          close(AppData.REVIEW_FORM);
        }
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleChange = (field, value) => {
    if (!formik.touched[field]) {
      formik.setFieldTouched(field, true);
    }

    formik.setFieldValue(field, value);
  };

  // TODO: Change file store logic
  const handleFileInput = e => {
    let newFiles = Array.from(e.target.files);

    let imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    const nonImageFiles = newFiles.filter(file => !file.type.startsWith('image/'));

    if (nonImageFiles.length) {
      setSnackbarMessage('Only image files are allowed');
      setSnackbarOpen(true);
    }

    const totalFiles = formik.values.files.length + imageFiles.length;

    if (totalFiles > MAX_UPLOAD_FILES) {
      imageFiles = imageFiles.slice(0, MAX_UPLOAD_FILES - formik.values.files.length);
      setSnackbarMessage(`Maximum upload limit of ${MAX_UPLOAD_FILES} files reached`);
      setSnackbarOpen(true);
    }

    const existingFiles = formik.values.files.map(file => file.id);

    const duplicates = imageFiles
      .filter(file => existingFiles.includes(file.name))
      .map(file => file.name);

    if (duplicates.length) {
      imageFiles = imageFiles.filter(file => !duplicates.includes(file.name));

      setSnackbarMessage('Duplicate files are not allowed');
      setSnackbarOpen(true);
    }

    formik.setFieldValue('files', [
      ...formik.values.files,
      ...imageFiles.map(file => ({
        id: file.name,
        name: file.name,
        src: 'https://www.thedailymeal.com/img/gallery/18-gummy-candies-ranked-worst-to-best/l-intro-1684764263.jpg',
      })),
    ]);
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }} noValidate>
      <Box width="100%" display="flex" flexDirection="column" mt={2}>
        <Box position="relative" mb={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
          {formik.touched.name && formik.errors.name && (
            <FormHelperText sx={sx.error}>{formik.errors.name}</FormHelperText>
          )}
        </Box>

        <Box position="relative" mb={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            type="text"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText sx={sx.error}>{formik.errors.email}</FormHelperText>
          )}
        </Box>

        <Box position="relative" width="100%" display="flex" flexDirection="column" gap={2} mb={6}>
          <RatingItem
            label="Service quality"
            isRequired={true}
            value={formik.values.ratings.serviceQuality}
            onChange={value => handleChange('ratings.serviceQuality', value)}
          />
          <RatingItem
            label="Product quality"
            isRequired={true}
            value={formik.values.ratings.productQuality}
            onChange={value => handleChange('ratings.productQuality', value)}
          />
          <RatingItem
            label="Delivery quality"
            isRequired={true}
            value={formik.values.ratings.deliveryQuality}
            onChange={value => handleChange('ratings.deliveryQuality', value)}
          />

          {(formik.getFieldMeta('ratings.serviceQuality').touched &&
            formik.getFieldMeta('ratings.serviceQuality').error) ||
          (formik.getFieldMeta('ratings.productQuality').touched &&
            formik.getFieldMeta('ratings.productQuality').error) ||
          (formik.getFieldMeta('ratings.deliveryQuality').touched &&
            formik.getFieldMeta('ratings.deliveryQuality').error) ? (
            <FormHelperText sx={sx.error}>All ratings are required</FormHelperText>
          ) : null}
        </Box>

        <Box position="relative" mb={2}>
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
          {formik.touched.review && formik.errors.review && (
            <FormHelperText sx={sx.error}>{formik.errors.review}</FormHelperText>
          )}
        </Box>

        <Box position="relative" display="flex" flexDirection="column" mb={6}>
          <Box>
            <FileUploadButton
              label="Attach files"
              isMultiple={true}
              onInput={handleFileInput}
              sx={sx.fileUploadButton}
            />
          </Box>
          <Box>
            {/* TODO: Change file store logic */}
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

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={4000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={() => {
                setSnackbarOpen(false);
                formik.setFieldError('files', undefined);
              }}
            >
              <Alert
                severity="error"
                variant="filled"
                onClose={() => {
                  setSnackbarOpen(false);
                  formik.setFieldError('files', undefined);
                }}
                sx={sx.alert}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Box>

          {formik.values.files.length > 1 && (
            <Button
              color="primary"
              sx={sx.deleteAllFilesButton}
              onClick={() => formik.setFieldValue('files', [])}
            >
              Delete All Files
            </Button>
          )}
        </Box>

        <Box position="relative" mb={3}>
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.process}
                onChange={e => handleChange('process', e.target.checked)}
              />
            }
            label={
              <FormLabel required>
                Agree to have my <Link href="#">personal data</Link> processed
              </FormLabel>
            }
          />
          {formik.touched.process && formik.errors.process && (
            <FormHelperText sx={sx.error}>{formik.errors.process}</FormHelperText>
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
  fileUploadButton: {
    width: '30%',
  },

  alert: theme => ({
    fontSize: theme.typography.font.XS,
  }),

  // TODO: (Color) as prop / sx / CSS class?
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
    color: theme.palette.error.main,
    fontSize: theme.typography.font.XS,
  }),

  submitButton: {
    width: '20%',
  },
};
