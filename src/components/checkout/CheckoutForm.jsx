import { useFormik } from 'formik';
import * as yup from 'yup';
import { formatISO } from 'date-fns';
import set from 'lodash/set';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import {
  useTheme,
  Box,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  FormHelperText,
  Switch,
  Link,
  Typography,
} from '@mui/material';

import { SNACKBARS } from '../../constants';
import { useSnackbar } from '../../hooks';
import { postOrders } from '../../api';

import { Radio, PrimaryButton, PhoneMask } from '../common';

const NATURAL_PERSON_FIELDS = [
  {
    id: 'fullName',
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    required: true,
    fullWidth: true,
  },
];

const JURIDICAL_PERSON_FIELDS = [
  {
    id: 'companyName',
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    required: true,
    fullWidth: true,
  },
  {
    id: 'INN',
    name: 'INN',
    label: 'Taxpayer Identification Number (INN)',
    type: 'text',
    fullWidth: true,
  },
  {
    id: 'KPP',
    name: 'KPP',
    label: 'Tax Registration Reason Code (KPP) ',
    type: 'text',
    fullWidth: true,
  },
  {
    id: 'contactPerson',
    name: 'contactPerson',
    label: 'Contact Person',
    type: 'text',
    required: true,
    fullWidth: true,
  },
];

const COMMON_FIELDS = [
  {
    required: true,
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'example@domain.tld',
    fullWidth: true,
  },
  {
    required: true,
    id: 'phone',
    name: 'phone',
    label: 'Phone Number',
    type: 'text',
    placeholder: '+7 (XXX) XXX-XX-XX',
    InputProps: {
      inputComponent: PhoneMask,
    },
    fullWidth: true,
  },
  {
    multiline: true,
    minRows: 4,
    maxRows: 8,
    id: 'comment',
    name: 'comment',
    label: 'Comment',
    type: 'text',
    fullWidth: true,
  },
];

const validationSchema = yup.object().shape({
  customerInfo: yup.object().shape({
    naturalPerson: yup.object().when('$customerType', {
      is: 'naturalPerson',
      then: schema =>
        schema.shape({
          fullName: yup
            .string()
            .matches(/^[a-zA-Z\\.\s-]+$/, 'Invalid name')
            .trim()
            .required('Name is required'),
        }),
      otherwise: schema => schema,
    }),
    juridicalPerson: yup.object().when('$customerType', {
      is: 'juridicalPerson',
      then: schema =>
        schema.shape({
          companyName: yup.string().trim().required('Company name is required'),
          INN: yup
            .string()
            .trim()
            .matches(/^(\d{10}|\d{12})$/, { message: 'Invalid INN', excludeEmptyString: true }),
          KPP: yup
            .string()
            .trim()
            .matches(/^\d{4}[\dA-Z][\dA-Z]\d{3}$/, { message: 'Invalid KPP', excludeEmptyString: true }),
          contactPerson: yup
            .string()
            .matches(/^[a-zA-Z\\.\s-]+$/, 'Invalid name')
            .trim()
            .required('Contact person is required'),
        }),
      otherwise: schema => schema,
    }),
    common: yup.object().shape({
      email: yup.string().trim().required('Email is required').email('Invalid email'),
      phone: yup
        .string()
        .required('Phone number is required')
        .transform(value => value.replace(/[^\d]/g, ''))
        .min(11, 'Phone number must contain 11 characters'),
    }),
  }),
  process: yup.boolean().oneOf([true], 'You must agree to have your personal data processed'),
});

export const CheckoutForm = () => {
  const theme = useTheme();

  const { openSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      customerType: 'naturalPerson',
      paymentMethod: 'cash',

      customerInfo: {
        naturalPerson: {
          fullName: '',
        },

        juridicalPerson: {
          companyName: '',
          INN: '',
          KPP: '',
          contactPerson: '',
        },

        common: {
          email: '',
          phone: '',
          comment: '',
        },
      },

      process: false,
    },

    validate: async values => {
      try {
        await validationSchema.validate(values, { abortEarly: false, context: { customerType: values.customerType } });
      } catch (e) {
        if (e.name !== 'ValidationError') {
          throw e;
        }

        return e.inner.reduce((errors, { path, message }) => set(errors, path, message), {});
      }
    },

    onSubmit: async values => {
      try {
        const date = formatISO(Date.now(), { representation: 'date' });

        let data = {
          customerType: values.customerType,
          paymentMethod: values.paymentMethod,
          customerInfo: {
            ...(values.customerType === 'naturalPerson' && {
              fullName: values.customerInfo.naturalPerson.fullName,
            }),

            ...(values.customerType === 'juridicalPerson' && {
              companyName: values.customerInfo.juridicalPerson.companyName,
              INN: values.customerInfo.juridicalPerson.INN,
              KPP: values.customerInfo.juridicalPerson.KPP,
              contactPerson: values.customerInfo.juridicalPerson.contactPerson,
            }),

            ...values.customerInfo.common,
          },

          process: values.process,
          date: date,
        };

        await postOrders(data);

        formik.resetForm();

        openSnackbar(SNACKBARS.CHECKOUT_FORM, {
          severity: 'success',
          message: 'Order successfully completed',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 4000,
        });
      } catch (e) {
        console.log('Error submitting form:', e);

        openSnackbar(SNACKBARS.CHECKOUT_FORM, {
          severity: 'error',
          message: 'Server error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 4000,
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%', margin: 'auto' }} autoComplete="off" noValidate>
      <Box>
        <Box
          display="flex"
          border={`solid 1px ${theme.palette.grey[400]}`}
          borderRadius={theme.shape.borderRadius}
          px={4}
          py={3}
          mb={4}
        >
          <AccountCircleOutlinedIcon color="primary" sx={sx.icon} />

          <FormControl>
            <FormLabel sx={sx.formLabel}>Customer Type</FormLabel>
            <RadioGroup
              row
              name="customerType"
              value={formik.values.customerType}
              onChange={e => {
                formik.resetForm();
                formik.setFieldValue('customerType', e.target.value, false);
              }}
            >
              <FormControlLabel label="Natural Person" control={<Radio value="naturalPerson" />} />
              <FormControlLabel label="Juridical Person" control={<Radio value="juridicalPerson" />} />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box
          display="flex"
          border={`solid 1px ${theme.palette.grey[400]}`}
          borderRadius={theme.shape.borderRadius}
          px={4}
          py={3}
          mb={4}
        >
          <AccountBalanceWalletOutlinedIcon color="primary" sx={sx.icon} />

          <Box>
            <FormControl>
              <FormLabel sx={sx.formLabel}>Payment Method</FormLabel>
              <RadioGroup
                row
                name="paymentMethod"
                value={formik.values.paymentMethod}
                onChange={e => formik.setFieldValue('paymentMethod', e.target.value)}
              >
                <FormControlLabel label="Cash" control={<Radio value="cash" />} />

                {formik.values.customerType === 'juridicalPerson' && (
                  <FormControlLabel label="Account" control={<Radio value="account" />} />
                )}
              </RadioGroup>
            </FormControl>

            <Typography
              color="textPrimary"
              fontSize={theme => theme.typography.font.S}
              fontWeight={theme => theme.typography.fontWeightLight}
              mt={2}
            >
              {formik.values.paymentMethod === 'account'
                ? 'An invoice containing the seller&#39;s payment details will be provided, allowing you to transfer funds for the items listed in the invoice.'
                : 'Payment is made in cash at the time of order receipt. The confirmation of your payment is a fiscal receipt handed to you upon receipt and payment of the order.'}
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          border={`solid 1px ${theme.palette.grey[400]}`}
          borderRadius={theme.shape.borderRadius}
          px={4}
          py={3}
          mb={6}
        >
          <AccountCircleOutlinedIcon color="primary" sx={sx.icon} />

          <Box flexGrow={1}>
            <Typography
              variant="h2"
              color="textPrimary"
              fontSize={theme => theme.typography.font.L}
              fontWeight={theme => theme.typography.fontWeightRegular}
            >
              Customer Info
            </Typography>

            <Box mt={4}>
              {formik.values.customerType === 'naturalPerson'
                ? NATURAL_PERSON_FIELDS.map(({ name, ...props }) => (
                    <Box key={props.id} position="relative" mb={4}>
                      <TextField
                        name={`customerInfo.naturalPerson.${name}`}
                        value={formik.values.customerInfo.naturalPerson[name] || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.getFieldMeta(`customerInfo.naturalPerson.${name}`).touched &&
                          Boolean(formik.getFieldMeta(`customerInfo.naturalPerson.${name}`).error)
                        }
                        helperText={
                          formik.getFieldMeta(`customerInfo.naturalPerson.${name}`).touched &&
                          formik.errors.customerInfo?.naturalPerson?.[name]
                        }
                        FormHelperTextProps={{ sx: sx.error }}
                        {...props}
                      />
                    </Box>
                  ))
                : JURIDICAL_PERSON_FIELDS.map(({ name, ...props }) => (
                    <Box key={props.id} position="relative" mb={4}>
                      <TextField
                        name={`customerInfo.juridicalPerson.${name}`}
                        value={formik.values.customerInfo.juridicalPerson[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.getFieldMeta(`customerInfo.juridicalPerson.${name}`).touched &&
                          Boolean(formik.getFieldMeta(`customerInfo.juridicalPerson.${name}`).error)
                        }
                        helperText={
                          formik.getFieldMeta(`customerInfo.juridicalPerson.${name}`).touched &&
                          formik.errors.customerInfo?.juridicalPerson?.[name]
                        }
                        FormHelperTextProps={{ sx: sx.error }}
                        {...props}
                      />
                    </Box>
                  ))}

              {COMMON_FIELDS.map(({ name, ...props }, index) => (
                <Box key={props.id} position="relative" mb={index == COMMON_FIELDS.length - 1 ? 0 : 4}>
                  <TextField
                    name={`customerInfo.common.${name}`}
                    value={formik.values.customerInfo.common[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.getFieldMeta(`customerInfo.common.${name}`).touched &&
                      Boolean(formik.getFieldMeta(`customerInfo.common.${name}`).error)
                    }
                    helperText={
                      formik.getFieldMeta(`customerInfo.common.${name}`).touched &&
                      formik.errors.customerInfo?.common?.[name]
                    }
                    FormHelperTextProps={{ sx: sx.error }}
                    {...props}
                  />
                </Box>
              ))}
            </Box>
          </Box>
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
          Checkout
        </PrimaryButton>
      </Box>
    </form>
  );
};

const sx = {
  icon: {
    width: '32px',
    height: '32px',
    mr: 2,
  },

  formLabel: {
    color: theme => theme.palette.text.primary,
    fontSize: theme => theme.typography.font.L,

    '&.Mui-focused': {
      color: theme => theme.palette.text.primary,
    },
  },

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
