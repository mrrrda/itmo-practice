import React from 'react';
import { useTranslation } from 'react-i18next';

import { MODALS } from '../../constants';
import { useModal } from '../../hooks';
import { ModalBase } from './ModalBase';
import { ReviewForm } from '../review';

export const CreateReviewModal: React.FC = () => {
  const { t } = useTranslation();

  const { closeModal } = useModal();

  return (
    <ModalBase
      modalId={MODALS.REVIEW_FORM}
      onClose={() => closeModal(MODALS.REVIEW_FORM)}
      title={t('forms.review.title')}
    >
      <ReviewForm />
    </ModalBase>
  );
};
