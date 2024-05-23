import { Suspense } from 'react';
import { GoogleAdUnitClient } from './GoogleAdUnitClient';

export const GoogleAdUnit = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <GoogleAdUnitClient>{children}</GoogleAdUnitClient>
    </Suspense>
  );
};
