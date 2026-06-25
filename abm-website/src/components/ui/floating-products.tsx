"use client";

import Image from "next/image";

interface FloatingItem {
  src: string;
  alt: string;
  top: string;
  left: string;
  size: number;
  animation: string;
  rotation: number;
  delay: string;
  glowColor: string;
}

const ITEMS: FloatingItem[] = [
  {
    src: "/products/dcp-t730dw.jpg",
    alt: "DCP Printer",
    top: "8%",
    left: "5%",
    size: 140,
    animation: "float-a 7s ease-in-out infinite",
    rotation: -8,
    delay: "0s",
    glowColor: "rgba(37,99,235,0.35)",
  },
  {
    src: "/products/hl-l6210dw.png",
    alt: "Mono Laser Printer",
    top: "10%",
    left: "80%",
    size: 120,
    animation: "float-b 9s ease-in-out infinite",
    rotation: 6,
    delay: "1.2s",
    glowColor: "rgba(37,99,235,0.3)",
  },
  {
    src: "/products/mfc-l8390cdw.jpg",
    alt: "Colour Laser MFC",
    top: "58%",
    left: "86%",
    size: 150,
    animation: "float-c 8s ease-in-out infinite",
    rotation: -5,
    delay: "0.6s",
    glowColor: "rgba(37,99,235,0.4)",
  },
  {
    src: "/products/ads1300.jpg",
    alt: "Document Scanner",
    top: "70%",
    left: "2%",
    size: 130,
    animation: "float-a 10s ease-in-out infinite",
    rotation: 10,
    delay: "2s",
    glowColor: "rgba(37,99,235,0.3)",
  },
  {
    src: "/products/pt-d460bt.jpg",
    alt: "Label Printer",
    top: "36%",
    left: "90%",
    size: 100,
    animation: "float-b 6.5s ease-in-out infinite",
    rotation: -12,
    delay: "3s",
    glowColor: "rgba(37,99,235,0.25)",
  },
  {
    src: "/products/ql820nwb.jpg",
    alt: "QL Label Printer",
    top: "40%",
    left: "1%",
    size: 110,
    animation: "float-c 11s ease-in-out infinite",
    rotation: 7,
    delay: "1.8s",
    glowColor: "rgba(37,99,235,0.3)",
  },
  {
    src: "/products/mfc-t930dw.jpg",
    alt: "MFC Inkjet",
    top: "3%",
    left: "44%",
    size: 125,
    animation: "float-b 7.5s ease-in-out infinite",
    rotation: 3,
    delay: "2.5s",
    glowColor: "rgba(37,99,235,0.28)",
  },
  {
    src: "/products/nc-9000w.jpg",
    alt: "Network Card",
    top: "83%",
    left: "53%",
    size: 105,
    animation: "float-a 8.5s ease-in-out infinite",
    rotation: -4,
    delay: "0.4s",
    glowColor: "rgba(37,99,235,0.25)",
  },
];

export function FloatingProducts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 5 }}>
      {ITEMS.map((item, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: item.top,
            left: item.left,
            animation: item.animation,
            animationDelay: item.delay,
            willChange: "transform",
          }}
        >
          {/* Blue glow halo behind the product */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(ellipse at center, ${item.glowColor} 0%, transparent 70%)`,
              filter: "blur(18px)",
              transform: "scale(1.4)",
              zIndex: 0,
            }}
          />

          {/* Product image with radial mask to erase the white background */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              transform: `rotate(${item.rotation}deg)`,
              WebkitMaskImage:
                "radial-gradient(ellipse 78% 78% at 50% 50%, black 40%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 78% 78% at 50% 50%, black 40%, transparent 100%)",
              filter: `drop-shadow(0 0 18px ${item.glowColor})`,
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.size}
              height={item.size}
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
