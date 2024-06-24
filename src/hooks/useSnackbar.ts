import { useContext } from 'react';

import { SnackbarsContext } from '../providers';

export const useSnackbar = () => useContext(SnackbarsContext);
