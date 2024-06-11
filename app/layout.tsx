import localFont from 'next/font/local';
import './globals.css';
import { Footer, Navigator } from '@/components';
import { OneSignalProvider, QueryProvider, ThemesProvider } from '@/utils';
import Script from 'next/script';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const Pretendard = localFont({
  src: './PretendardVariable.woff2',
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Backup',
  description: '모두를 위한 디자인 피드백 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Pretendard.className} suppressHydrationWarning>
      <head>
        <meta
          name="google-adsense-account"
          content={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS}`}
        />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        />
      </head>
      <body>
        <QueryProvider>
          <ThemesProvider>
            <OneSignalProvider>
              <main className="min-h-[100dvh] flex flex-col items-center">
                <Navigator />
                {children}
              </main>
            </OneSignalProvider>
            <Footer />
          </ThemesProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
