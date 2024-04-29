'use client';

import { Button } from '@/components';
import { type ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';

type Props = ComponentProps<'button'> & {
  pendingText?: string;
};

export const SubmitButton = ({ children, pendingText, ...props }: Props) => {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button
      size="large"
      kind="primary"
      type="submit"
      aria-disabled={pending}
      disable={pending}
      {...props}
    >
      {isPending ? pendingText : children}
    </Button>
  );
};
