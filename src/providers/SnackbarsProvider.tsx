import React, { createContext, useState } from 'react';

import { Snackbar, SnackbarProps } from '../components/common';

type SnackbarState = {
  isOpen: boolean;
  args: SnackbarProps;
};

type SnackbarsContextType = {
  openSnackbar: (key: string, args: SnackbarProps) => void;
  closeSnackbar: (key: string) => void;
  getSnackbarState: (key: string) => SnackbarState;
};

type SnackbarsProviderProps = {
  children: React.ReactNode;
};

export const SnackbarsContext = createContext<SnackbarsContextType>({} as SnackbarsContextType);

export const SnackbarsProvider: React.FC<SnackbarsProviderProps> = ({ children }) => {
  const [snackbarsRegistry, setSnackbarsRegistry] = useState<Record<string, SnackbarState>>({});

  const openSnackbar = (key: string, args: SnackbarProps = {} as SnackbarProps): void =>
    setSnackbarsRegistry(prevSnackbarsRegistry => ({
      ...prevSnackbarsRegistry,
      [key]: {
        isOpen: true,
        args,
      },
    }));

  const closeSnackbar = (key: string): void =>
    setSnackbarsRegistry(prevSnackbarsRegistry => ({
      ...prevSnackbarsRegistry,
      [key]: {
        isOpen: false,
        args: prevSnackbarsRegistry[key]?.args ?? {},
      },
    }));

  const getSnackbarState = (key: string): SnackbarState =>
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
