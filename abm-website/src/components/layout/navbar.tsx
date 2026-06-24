"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Printer,
  Tag,
  Droplet,
  BookMarked,
  Copy,
  ScanLine,
  Projector,
  Monitor,
  MonitorSmartphone,
  Scissors,
  Clock,
  Lock,
  Package,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { CATEGORIES, BRAND_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/shop/search-modal";
import { CartDrawer } from "@/components/shop/cart-drawer";

const categoryIcons: Record<string, React.ElementType> = {
  Printer, Tag, Droplet, BookMarked, Copy, ScanLine, Projector,
  Monitor, MonitorSmartphone, Scissors, Clock, Lock, Package,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { itemCount } = useCart();
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navTextClass = cn(
    "transition-colors duration-300",
    isHome && !scrolled ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900"
  );

  const navBg = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
    scrolled || !isHome
      ? "glass border-b border-slate-200/60 shadow-sm"
      : "bg-transparent"
  );

  return (
    <>
      {/* Navbar */}
      <header className={navBg}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div
                className="relative w-9 h-9 shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={isHome && !scrolled ? { mixBlendMode: "screen" } : undefined}
              >
                <Image
                  src="/logo.png"
                  alt="ABM Kuwait"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Shop mega-menu trigger */}
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  navTextClass,
                  megaOpen && (isHome && !scrolled
                    ? "bg-white/10"
                    : "bg-slate-100 text-slate-900")
                )}>
                  Shop
                  <ChevronDown className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    megaOpen && "rotate-180"
                  )} />
                </button>

                {/* Mega dropdown */}
                <div className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] transition-all duration-300 origin-top",
                  megaOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                )}>
                  <div className="glass border border-slate-200/80 rounded-2xl shadow-2xl p-4 overflow-hidden">
                    <div className="grid grid-cols-2 gap-1">
                      {CATEGORIES.map((cat) => {
                        const Icon = categoryIcons[cat.icon || "Package"];
                        return (
                          <Link
                            key={cat.slug}
                            href={`/shop/${cat.slug}`}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors group/item"
                            onClick={() => setMegaOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover/item:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
                              {Icon && <Icon className="h-4 w-4 text-slate-500 group-hover/item:text-blue-600 transition-colors" />}
                            </div>
                            <span className="text-sm text-slate-700 group-hover/item:text-blue-700 font-medium transition-colors">
                              {cat.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="border-t border-slate-100 mt-3 pt-3 flex items-center justify-between px-1">
                      <span className="text-xs text-slate-400">All categories</span>
                      <Link
                        href="/shop"
                        className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        onClick={() => setMegaOpen(false)}
                      >
                        Browse all products
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {[
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    navTextClass,
                    pathname === href && (isHome && !scrolled ? "bg-white/10" : "bg-slate-100 text-slate-900")
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
                  isHome && !scrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
                aria-label="Search"
              >
                <Search className="h-4.5 w-4.5" strokeWidth={1.8} />
              </button>

              <Link href="/account">
                <button className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
                  isHome && !scrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}>
                  <User className="h-4.5 w-4.5" strokeWidth={1.8} />
                </button>
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 relative",
                  isHome && !scrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
                aria-label="Cart"
              >
                <ShoppingCart className="h-4.5 w-4.5" strokeWidth={1.8} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              <button
                className={cn(
                  "lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ml-1",
                  isHome && !scrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen
                  ? <X className="h-4.5 w-4.5" strokeWidth={1.8} />
                  : <Menu className="h-4.5 w-4.5" strokeWidth={1.8} />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 flex flex-col lg:hidden transition-all duration-500",
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div className={cn(
          "absolute inset-y-0 right-0 w-full max-w-sm bg-white flex flex-col transition-transform duration-500",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <span className="font-bold text-slate-900">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-1.5 mb-6">
              {CATEGORIES.map((cat) => {
                const Icon = categoryIcons[cat.icon || "Package"];
                return (
                  <Link
                    key={cat.slug}
                    href={`/shop/${cat.slug}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {Icon && <Icon className="h-4 w-4 text-blue-500 shrink-0" />}
                    <span className="text-sm text-slate-700 font-medium leading-tight">{cat.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-1">
              {[
                { href: "/shop", label: "All Products" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/account", label: "My Account" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-300" />
                </Link>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs text-slate-500 mb-1">Call us</p>
              <a href={`tel:${BRAND_INFO.phone1}`} className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                {BRAND_INFO.phone1}
              </a>
            </div>
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
