import React from 'react';
import { SnackbarsContext } from '../providers';

export const useSnackbar = () => React.useContext(SnackbarsContext);
