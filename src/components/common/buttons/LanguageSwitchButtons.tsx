import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

import { LANGUAGES } from '../../../constants';

export const LanguageSwitchButtons: React.FC = () => {
  const { i18n } = useTranslation();

  return LANGUAGES.map(lng => (
    <Button key={lng.code} onClick={() => i18n.changeLanguage(lng.code)}>
      {lng.name}
    </Button>
  ));
};
