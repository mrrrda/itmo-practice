import React from 'react';

export const ModalsContext = React.createContext({});

export const ModalsProvider = ({ children }) => {
  const [modalsRegistry, setModalsRegistry] = React.useState({});

  function open(key, args = {}) {
    setModalsRegistry(prevModalsRegistry => ({
      ...prevModalsRegistry,
      [key]: {
        isOpen: true,
        args,
      },
    }));
  }

  function close(key) {
    setModalsRegistry(prevModalsRegistry => ({
      ...prevModalsRegistry,
      [key]: {
        isOpen: false,
        args: prevModalsRegistry[key]?.args ?? {},
      },
    }));
  }

  function getState(key) {
    return (
      modalsRegistry[key] ?? {
        isOpen: false,
        args: {},
      }
    );
  }

  const contextValue = {
    open,
    close,
    getState,
  };

  return <ModalsContext.Provider value={contextValue}>{children}</ModalsContext.Provider>;
};
