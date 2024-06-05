import OneSignal from 'react-onesignal';

export const OneSignalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const runOneSignal = async () => {
    await OneSignal.init({ appId: '', allowLocalhostAsSecureOrigin: true });
    OneSignal.Slidedown.promptPush();
  };
  return <>{children}</>;
};
