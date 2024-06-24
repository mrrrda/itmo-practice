import React, { createContext, useState } from 'react';

type ModalState = {
  isOpen: boolean;
  args: Record<string, unknown>;
};

type ModalsContextType = {
  openModal: (key: string, args?: Record<string, unknown>) => void;
  closeModal: (key: string) => void;
  getModalState: (key: string) => ModalState;
};

type ModalsProviderProps = {
  children: React.ReactNode;
};

export const ModalsContext = createContext<ModalsContextType>({} as ModalsContextType);

export const ModalsProvider: React.FC<ModalsProviderProps> = ({ children }) => {
  const [modalsRegistry, setModalsRegistry] = useState<Record<string, ModalState>>({});

  const openModal = (key: string, args: Record<string, unknown> = {}): void =>
    setModalsRegistry(prevModalsRegistry => ({
      ...prevModalsRegistry,
      [key]: {
        isOpen: true,
        args,
      },
    }));

  const closeModal = (key: string): void =>
    setModalsRegistry(prevModalsRegistry => ({
      ...prevModalsRegistry,
      [key]: {
        isOpen: false,
        args: prevModalsRegistry[key]?.args ?? {},
      },
    }));

  const getModalState = (key: string): ModalState =>
    modalsRegistry[key] ?? {
      isOpen: false,
      args: {},
    };

  const contextValue: ModalsContextType = {
    openModal,
    closeModal,
    getModalState,
  };

  return <ModalsContext.Provider value={contextValue}>{children}</ModalsContext.Provider>;
};
