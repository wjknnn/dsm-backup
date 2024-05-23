'use client';

import { useEffect } from 'react';

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataAdLayoutKey: string;
  dataFullWidthResponsive?: boolean;
};

export const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataAdLayoutKey,
  dataFullWidthResponsive,
}: AdBannerTypes) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS}`}
      data-ad-slot={dataAdSlot}
      data-ad-layout-key={dataAdLayoutKey}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={
        dataFullWidthResponsive ? dataFullWidthResponsive.toString() : 'false'
      }
    ></ins>
  );
};
