import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import { AnimateIn, StaggerGroup } from "@/components/ui/animate-in";
import { ProductCard } from "@/components/shop/product-card";
import { CATEGORIES } from "@/lib/constants";
import { PRODUCTS, getProductsByCategory } from "@/lib/mock-data";
import {
  Printer, Tag, Droplet, BookMarked, Copy, ScanLine, Projector,
  Monitor, MonitorSmartphone, Scissors, Clock, Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse all office equipment — printers, scanners, inks, labels, shredders and more.",
};

const categoryIcons: Record<string, React.ElementType> = {
  Printer, Tag, Droplet, BookMarked, Copy, ScanLine, Projector,
  Monitor, MonitorSmartphone, Scissors, Clock, Lock, Package,
};

export default function ShopPage() {
  const withCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: getProductsByCategory(cat.slug).length,
  }));

  return (
    <div className="pt-16 bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="border-b border-white/5 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateIn>
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              All Products
            </h1>
          </AnimateIn>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
        {/* Category quick-links */}
        <AnimateIn className="mb-12">
          <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
            Browse by category
          </h2>
        </AnimateIn>

        <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 mb-16">
          {withCounts.map((cat) => {
            const Icon = categoryIcons[cat.icon || "Package"] || Package;
            return (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="category-card group flex flex-col rounded-xl border border-white/[0.07] hover:border-blue-500/30 bg-white/[0.03] hover:bg-white/[0.06] overflow-hidden transition-all duration-300"
              >
                <div className="relative h-24 bg-white/[0.04] overflow-hidden">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.08]"
                      sizes="(max-width: 640px) 50vw, 200px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-slate-600" strokeWidth={1.2} />
                    </div>
                  )}
                </div>
                <div className="px-2.5 py-2 border-t border-white/[0.05]">
                  <p className="text-[11px] font-semibold text-slate-300 group-hover:text-blue-400 transition-colors leading-snug">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{cat.count} items</p>
                </div>
              </Link>
            );
          })}
        </StaggerGroup>

        {/* All products */}
        <div className="flex items-center justify-between mb-6">
          <AnimateIn>
            <h2 className="text-xl font-bold text-white">All Products</h2>
          </AnimateIn>
          <AnimateIn type="right">
            <p className="text-sm text-white/30">{PRODUCTS.filter(p => !p.isComingSoon).length} items</p>
          </AnimateIn>
        </div>

        <StaggerGroup className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
          {PRODUCTS.filter((p) => !p.isComingSoon).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
