import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SITE_NAME, SITE_DESCRIPTION, BRAND_INFO } from "@/lib/constants";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Office Equipment Kuwait`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "office equipment Kuwait",
    "Brother printer Kuwait",
    "label printer Kuwait",
    "shredder Kuwait",
    "scanner Kuwait",
    "ink cartridge Kuwait",
    "ABM Kuwait",
    "printer maintenance Kuwait",
    "Brother authorized dealer Kuwait",
  ],
  openGraph: {
    title: `${SITE_NAME} — Office Equipment Kuwait`,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_KW",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Office Equipment Kuwait`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "https://abm-kuwait.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* WhatsApp FAB */}
          <Link
            href={`https://wa.me/${BRAND_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#25D366] shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-110 flex items-center justify-center transition-all duration-300 btn-press"
          >
            <MessageCircle className="h-5 w-5 text-white" strokeWidth={2} />
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
              WhatsApp
            </span>
          </Link>
        </Providers>
      </body>
    </html>
  );
}
