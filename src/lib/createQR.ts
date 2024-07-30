import type {
    CornerDotType,
    CornerSquareType,
    DotType,
    DrawType,
    ErrorCorrectionLevel,
    Mode,
    Options,
    TypeNumber,
  } from "@solana/qr-code-styling";
  import QRCodeStyling from "@solana/qr-code-styling";
  
  /**
   * Create a themed QR code from a Note Action URL.
   *
   * @param url - The URL to encode.
   * @param size - Width and height in pixels.
   * @param background - Background color, which should be light for device compatibility.
   * @param color - Foreground color, which should be dark for device compatibility.
   */
  export function createQR(
    url: string | URL,
    size = 512,
    background = "white",
    color = "black",
  ): QRCodeStyling {
    return new QRCodeStyling(createQROptions(url, size, background, color));
  }
  
  /** @ignore */
  export const SolanaQRCodeStyling = QRCodeStyling;
  
  /** @ignore */
  export function createQROptions(
    url: string | URL,
    size = 512,
    background = "white",
    color = "black",
  ): Options {
    return {
      type: "svg" as DrawType,
      width: size,
      height: size,
      data: String(url),
      margin: 16,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
      },
      backgroundOptions: { color: background },
      dotsOptions: { type: "extra-rounded" as DotType, color },
      cornersSquareOptions: {
        type: "extra-rounded" as CornerSquareType,
        color,
      },
      cornersDotOptions: { type: "square" as CornerDotType, color },
      imageOptions: { hideBackgroundDots: true, imageSize: 0.15, margin: 8 },
      image: `/bitcoin.svg`,
    };
  }
  