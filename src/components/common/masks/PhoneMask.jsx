/* eslint-disable react/display-name */
import { forwardRef } from 'react';

import MaskedInput from 'react-text-mask';

const MASK = ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

export const PhoneMask = forwardRef((props, setRef) => (
  <MaskedInput
    ref={innerRef => {
      if (innerRef) {
        setRef(innerRef.inputElement);
      }
    }}
    mask={MASK}
    guide={false}
    {...props}
  />
));
