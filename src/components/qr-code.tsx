"use client";

import { createQR } from "@/lib/createQR";
import { encodeURL } from "@solana/actions";
import { useEffect, useRef } from "react";

type ComponentProps = {
  url: string | URL;
  className?: string;
  background?: string;
  color?: string;
  size?: number;
};

export function SolanaQRCode({
  url,
  className,
  background = "transparent",
  color,
  size = 300,
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const encodedUrl = encodeURL(
      {
        link: new URL(url, window.location.href),
      },
      //@ts-ignore
      "bitcoin-action:",
    );

    console.log("encodedUrl:", encodedUrl.toString());

    const qr = createQR(encodedUrl, size, background, color);

    if (ref.current && !ref.current.innerHTML) {
      qr.append(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return <div ref={ref} className={className} />;
}
