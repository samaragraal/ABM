import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { CATEGORIES, BRAND_INFO } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div
                className="relative w-8 h-8 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ mixBlendMode: "screen" }}
              >
                <Image
                  src="/logo.png"
                  alt="ABM Kuwait"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                ABM <span className="text-blue-400">Kuwait</span>
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
              Kuwait&apos;s premier office equipment partner. Authorized Brother
              dealer since 2010.
            </p>

            {/* Contact compact */}
            <div className="space-y-2.5 text-sm">
              <a
                href={`tel:${BRAND_INFO.phone1}`}
                className="flex items-center gap-2.5 text-slate-500 hover:text-white transition-colors group"
              >
                <Phone className="h-3.5 w-3.5 text-blue-500 shrink-0" strokeWidth={1.8} />
                <span>{BRAND_INFO.phone1} — {BRAND_INFO.phone2}</span>
              </a>
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="flex items-center gap-2.5 text-slate-500 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-blue-500 shrink-0" strokeWidth={1.8} />
                {BRAND_INFO.email}
              </a>
              <div className="flex items-start gap-2.5 text-slate-500">
                <Clock className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" strokeWidth={1.8} />
                <span>{BRAND_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Shop
            </p>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/shop/${cat.slug}`}
                    className="text-sm text-slate-500 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  All products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "My Account", href: "/account" },
                { label: "Orders", href: "/account/orders" },
                { label: "Admin", href: "/admin" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Locations
            </p>
            <div className="space-y-5 text-sm">
              <div>
                <p className="text-[11px] text-slate-600 uppercase tracking-wider font-semibold mb-1.5">Admin</p>
                <div className="flex items-start gap-2 text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" strokeWidth={1.8} />
                  <span className="leading-snug">{BRAND_INFO.adminAddress}</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] text-slate-600 uppercase tracking-wider font-semibold mb-1.5">Workshop</p>
                <div className="flex items-start gap-2 text-slate-500">
                  <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" strokeWidth={1.8} />
                  <span className="leading-snug">{BRAND_INFO.workshopAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 mt-1.5">
                  <Phone className="h-3.5 w-3.5 text-blue-500 shrink-0" strokeWidth={1.8} />
                  <a href={`tel:${BRAND_INFO.workshopPhone}`} className="hover:text-white transition-colors">
                    {BRAND_INFO.workshopPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">
            &copy; {year} ABM Kuwait. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">
            Printers · Scanners · Labels · Shredders · Safes
          </p>
        </div>
      </div>
    </footer>
  );
}
