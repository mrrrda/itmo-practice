import { MODALS } from '../../constants';
import { useModal } from '../../hooks';

import { ModalBase } from './ModalBase';
import { ReviewForm } from '../review';

export const CreateReviewModal = () => {
  const { closeModal } = useModal();

  return (
    <ModalBase modalId={MODALS.REVIEW_FORM} onClose={() => closeModal(MODALS.REVIEW_FORM)} title="Leave your Review">
      <ReviewForm />
    </ModalBase>
  );
};
