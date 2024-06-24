/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import MaskedInput from 'react-text-mask';

const MASK = ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

export const PhoneMask = forwardRef((props, ref) => (
  <MaskedInput
    ref={innerRef => {
      if (innerRef && typeof ref === 'function') {
        ref(innerRef.inputElement);
      }
    }}
    mask={MASK}
    guide={false}
    {...props}
  />
));
