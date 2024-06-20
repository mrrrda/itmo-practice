import React from 'react';

import { Snackbar } from '../components/common';

export const SnackbarsContext = React.createContext({});

export const SnackbarsProvider = ({ children }) => {
  const [snackbarsRegistry, setSnackbarsRegistry] = React.useState({});

  const openSnackbar = (key, args = {}) =>
    setSnackbarsRegistry(prevSnackbarsRegistry => ({
      ...prevSnackbarsRegistry,
      [key]: {
        isOpen: true,
        args,
      },
    }));

  const closeSnackbar = key =>
    setSnackbarsRegistry(prevSnackbarsRegistry => ({
      ...prevSnackbarsRegistry,
      [key]: {
        isOpen: false,
        args: prevSnackbarsRegistry[key]?.args ?? {},
      },
    }));

  const getSnackbarState = key =>
    snackbarsRegistry[key] ?? {
      isOpen: false,
      args: {},
    };

  const contextValue = {
    openSnackbar,
    closeSnackbar,
    getSnackbarState,
  };

  return (
    <SnackbarsContext.Provider value={contextValue}>
      {children}
      {Object.keys(snackbarsRegistry).map(key => (
        <Snackbar
          key={key}
          open={snackbarsRegistry[key].isOpen}
          onClose={() => closeSnackbar(key)}
          severity={snackbarsRegistry[key].args.severity}
          message={snackbarsRegistry[key].args.message}
          anchorOrigin={snackbarsRegistry[key].args.anchorOrigin}
          autoHideDuration={snackbarsRegistry[key].args.autoHideDuration}
        />
      ))}
    </SnackbarsContext.Provider>
  );
};
