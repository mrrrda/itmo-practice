import { createContext, useState } from 'react';

export const ModalsContext = createContext({});

export const ModalsProvider = ({ children }) => {
  const [modalsRegistry, setModalsRegistry] = useState({});

  const openModal = (key, args = {}) =>
    setModalsRegistry(prevModalsRegistry => ({
      ...prevModalsRegistry,
      [key]: {
        isOpen: true,
        args,
      },
    }));

  const closeModal = key =>
    setModalsRegistry(prevModalsRegistry => ({
      ...prevModalsRegistry,
      [key]: {
        isOpen: false,
        args: prevModalsRegistry[key]?.args ?? {},
      },
    }));

  const getModalState = key =>
    modalsRegistry[key] ?? {
      isOpen: false,
      args: {},
    };

  const contextValue = {
    openModal,
    closeModal,
    getModalState,
  };

  return <ModalsContext.Provider value={contextValue}>{children}</ModalsContext.Provider>;
};
