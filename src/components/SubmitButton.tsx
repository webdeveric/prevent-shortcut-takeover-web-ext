import { useFormStatus } from 'react-dom';

import type { FunctionComponent, PropsWithChildren, ButtonHTMLAttributes, ReactElement } from 'react';

export const SubmitButton: FunctionComponent<
  PropsWithChildren<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>>
> = ({ children, disabled, ...props }): ReactElement => {
  const status = useFormStatus();

  return (
    <button type="submit" disabled={status.pending || disabled} {...props}>
      {children}
    </button>
  );
};
