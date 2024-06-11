'use client';

import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

export const OneSignalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const runOneSignal = async () => {
    await OneSignal.init({
      appId: '8eb0762f-653d-4863-8bb3-cfc18159e565',
      allowLocalhostAsSecureOrigin: true,
    });
    OneSignal.Slidedown.promptPush();
  };

  useEffect(() => {
    runOneSignal();
  });

  return <>{children}</>;
};
