"use client";

import Image from "next/image";

interface FloatingItem {
  src: string;
  alt: string;
  top: string;
  left: string;
  size: number;
  opacity: number;
  animation: string;
  rotation: number;
  delay: string;
}

const ITEMS: FloatingItem[] = [
  {
    src: "/products/dcp-t730dw.jpg",
    alt: "DCP Printer",
    top: "8%",
    left: "5%",
    size: 130,
    opacity: 0.18,
    animation: "float-a 7s ease-in-out infinite",
    rotation: -8,
    delay: "0s",
  },
  {
    src: "/products/hl-l6210dw.png",
    alt: "Mono Laser Printer",
    top: "12%",
    left: "82%",
    size: 110,
    opacity: 0.14,
    animation: "float-b 9s ease-in-out infinite",
    rotation: 6,
    delay: "1.2s",
  },
  {
    src: "/products/mfc-l8390cdw.jpg",
    alt: "Colour Laser MFC",
    top: "60%",
    left: "88%",
    size: 140,
    opacity: 0.16,
    animation: "float-c 8s ease-in-out infinite",
    rotation: -5,
    delay: "0.6s",
  },
  {
    src: "/products/ads1300.jpg",
    alt: "Document Scanner",
    top: "72%",
    left: "3%",
    size: 120,
    opacity: 0.15,
    animation: "float-a 10s ease-in-out infinite",
    rotation: 10,
    delay: "2s",
  },
  {
    src: "/products/pt-d460bt.jpg",
    alt: "Label Printer",
    top: "38%",
    left: "92%",
    size: 90,
    opacity: 0.12,
    animation: "float-b 6.5s ease-in-out infinite",
    rotation: -12,
    delay: "3s",
  },
  {
    src: "/products/ql820nwb.jpg",
    alt: "QL Label Printer",
    top: "42%",
    left: "2%",
    size: 100,
    opacity: 0.13,
    animation: "float-c 11s ease-in-out infinite",
    rotation: 7,
    delay: "1.8s",
  },
  {
    src: "/products/nc-9000w.jpg",
    alt: "Network Card",
    top: "85%",
    left: "55%",
    size: 95,
    opacity: 0.11,
    animation: "float-a 8.5s ease-in-out infinite",
    rotation: -4,
    delay: "0.4s",
  },
  {
    src: "/products/mfc-t930dw.jpg",
    alt: "MFC Inkjet",
    top: "4%",
    left: "45%",
    size: 115,
    opacity: 0.13,
    animation: "float-b 7.5s ease-in-out infinite",
    rotation: 3,
    delay: "2.5s",
  },
];

export function FloatingProducts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: item.top,
            left: item.left,
            animation: item.animation,
            animationDelay: item.delay,
            transform: `rotate(${item.rotation}deg)`,
            willChange: "transform",
          }}
        >
          <div
            style={{
              opacity: item.opacity,
              filter: "blur(0.6px)",
              mixBlendMode: "screen",
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
