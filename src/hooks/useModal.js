import React from 'react';
import { ModalsContext } from '../providers';

export const useModal = () => React.useContext(ModalsContext);
