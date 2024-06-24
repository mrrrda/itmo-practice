import { useContext } from 'react';

import { ModalsContext } from '../providers';

export const useModal = () => useContext(ModalsContext);
