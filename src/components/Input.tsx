import { useCallback, useRef, useState, type FunctionComponent, type InputHTMLAttributes } from 'react';

import { debug } from '@utils/logging.js';

export type ValidatorFn = (value: string) => string | undefined;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  validator?: ValidatorFn;
  children?: never;
}

export const Input: FunctionComponent<InputProps> = ({ validator, onBlur, onInput, onInvalid, ...props }) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [validationMessage, setValidationMessage] = useState('');

  const runValidation = useCallback((): void => {
    const input = ref.current;

    if (!input || !validator) {
      return;
    }

    let message: string;

    try {
      message = validator(input.value) || '';
    } catch (error) {
      debug('Input validator threw an error', error);

      message = error instanceof Error ? error.message : String(error);
    }

    input.setCustomValidity(message);

    setValidationMessage(message);
  }, [validator]);

  return (
    <>
      <input
        {...props}
        ref={ref}
        aria-invalid={validationMessage ? 'true' : undefined}
        onInput={(event) => {
          runValidation();
          onInput?.(event);
        }}
        onInvalid={(event) => {
          runValidation();
          onInvalid?.(event);
        }}
        onBlur={(event) => {
          if (event.target.value) {
            runValidation();
          }
          onBlur?.(event);
        }}
      />
      {validationMessage && (
        <div role="alert" aria-live="polite" className="font-bold text-red-700 dark:text-white">
          {validationMessage}
        </div>
      )}
    </>
  );
};
