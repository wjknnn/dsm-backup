import localFont from "next/font/local";
import "./globals.css";
import { Navigator } from "@/components";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const Pretendard = localFont({
  src: "./PretendardVariable.woff2",
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Backup",
  description: "모두를 위한 디자인 피드백 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Pretendard.className}>
      <body>
        <main className="min-h-[100dvh] flex flex-col items-center">
          <Navigator />
          {children}
        </main>
      </body>
    </html>
  );
}
