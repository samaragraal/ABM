import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Wrench,
  Award,
  ChevronDown,
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
} from "lucide-react";
import { AnimateIn, StaggerGroup } from "@/components/ui/animate-in";
import { HeroBackground } from "@/components/ui/hero-background";
import { ProductCard } from "@/components/shop/product-card";
import { CATEGORIES } from "@/lib/constants";
import { getFeaturedProducts, getNewArrivals, getProductsByCategory } from "@/lib/mock-data";

const categoryIcons: Record<string, React.ElementType> = {
  Printer, Tag, Droplet, BookMarked, Copy, ScanLine, Projector,
  Monitor, MonitorSmartphone, Scissors, Clock, Lock, Package,
};

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(6);

  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    ...cat,
    productCount: getProductsByCategory(cat.slug).length,
  }));

  return (
    <div className="flex flex-col overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
        {/* Particle field, aurora bands, film grain */}
        <HeroBackground />

        {/* Central radial glow — sits above particles, below content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 4 }}>
          <div
            className="w-[900px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-8 text-center pt-24 pb-20">

          {/* Logo */}
          <div
            className="flex justify-center mb-6"
            style={{ animation: "fade-in 1s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
          >
            <div className="relative w-32 h-32 lg:w-40 lg:h-40">
              {/* Expanding ring 1 */}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1.5px solid rgba(37,99,235,0.5)",
                  animation: "logo-ring-pulse 3s ease-out infinite",
                }}
              />
              {/* Expanding ring 2 — offset */}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1.5px solid rgba(99,120,255,0.35)",
                  animation: "logo-ring-pulse 3s ease-out infinite 1s",
                }}
              />
              {/* Expanding ring 3 — further offset */}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid rgba(139,92,246,0.25)",
                  animation: "logo-ring-pulse 3s ease-out infinite 2s",
                }}
              />
              {/* Logo with glow pulse */}
              <Image
                src="/logo.png"
                alt="ABM Kuwait"
                fill
                priority
                className="object-contain relative"
                style={{
                  mixBlendMode: "screen",
                  animation: "logo-glow-pulse 3s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* Company name */}
          <p
            className="text-sm lg:text-base font-medium text-white/40 tracking-[0.15em] uppercase mb-10"
            style={{ animation: "fade-in 0.9s ease 0.3s both" }}
          >
            Arabian Business Machines Co.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center justify-center gap-3"
            style={{ animation: "fade-in-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}
          >
            <Link
              href="/shop"
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 btn-press"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-white/8 hover:bg-white/12 border border-white/10 text-white/80 hover:text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-sm btn-press"
            >
              Get a Quote
            </Link>
          </div>

        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20"
          style={{ animation: "fade-in 1s ease 1.2s both" }}
        >
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </section>


      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <AnimateIn>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
                  Everything you need
                </p>
              </AnimateIn>
              <AnimateIn delay={80}>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Shop by Category
                </h2>
              </AnimateIn>
            </div>
            <AnimateIn delay={120} type="right">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
              >
                View all products
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </AnimateIn>
          </div>

          {/* Categories grid */}
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:grid-rows-3 gap-3">
            {categoriesWithCounts.map((cat) => {
              const Icon = categoryIcons[cat.icon || "Package"] || Package;
              return (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className="category-card group flex flex-col rounded-2xl border border-slate-200 hover:border-blue-200 bg-white overflow-hidden"
                >
                  {/* Image thumbnail */}
                  <div className="relative h-28 bg-slate-50 overflow-hidden">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.08]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-10 w-10 text-slate-200" strokeWidth={1.2} />
                      </div>
                    )}
                  </div>
                  {/* Label */}
                  <div className="px-3 py-2.5 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors leading-snug">
                      {cat.name}
                    </p>
                    {cat.productCount > 0 && (
                      <p className="text-[10px] text-slate-400 mt-0.5">{cat.productCount} items</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ── BEST SELLERS ──────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-12 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-6 lg:mb-14 px-5 lg:px-8">
            <div>
              <AnimateIn>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2 lg:mb-3">
                  Our best
                </p>
              </AnimateIn>
              <AnimateIn delay={80}>
                <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  Best Sellers
                </h2>
              </AnimateIn>
            </div>
            <AnimateIn delay={120} type="right">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors shrink-0"
              >
                Browse all
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </AnimateIn>
          </div>

          {/* Mobile: horizontal swipe shelf */}
          <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 px-5 pb-4">
            {featured.map((product) => (
              <div key={product.id} className="snap-start shrink-0 w-[68vw]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Tablet+: grid */}
          <StaggerGroup className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 px-5 lg:px-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGroup>
        </div>
      </section>


      {/* ── NEW ARRIVALS ──────────────────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="bg-white py-12 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-4 mb-6 lg:mb-14 px-5 lg:px-8">
              <div>
                <AnimateIn>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2 lg:mb-3">
                    Just landed
                  </p>
                </AnimateIn>
                <AnimateIn delay={80}>
                  <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight">
                    New Arrivals
                  </h2>
                </AnimateIn>
              </div>
              <AnimateIn delay={120} type="right">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors shrink-0"
                >
                  See all
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </AnimateIn>
            </div>

            {/* Mobile: horizontal swipe shelf */}
            <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 px-5 pb-4">
              {newArrivals.map((product) => (
                <div key={product.id} className="snap-start shrink-0 w-[68vw]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Tablet+: grid */}
            <StaggerGroup className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5 px-5 lg:px-8">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* ── VALUE PROPS ───────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 lg:py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Why ABM Kuwait?
            </h2>
          </AnimateIn>

          <StaggerGroup className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: "100% Genuine",
                body: "Every product sourced directly from authorized distributors. Full manufacturer warranty on all items.",
              },
              {
                icon: Wrench,
                title: "Workshop & Service",
                body: "On-site maintenance facility at Kuwait Free Zone. Expert technicians for repair and servicing.",
              },
              {
                icon: Award,
                title: "15+ Years Experience",
                body: "Serving Kuwaiti businesses since 2010. A partner you can trust for all your office equipment needs.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mb-6 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-slate-500 group-hover:text-blue-600 transition-colors duration-300" strokeWidth={1.6} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── BRANDS ────────────────────────────────────────────────────────── */}
      {(() => {
        const all = [
          { name: "Brother",    img: "/brands/brother.jpg",   href: "/shop/printers-mfp" },
          { name: "BenQ",       img: "/brands/benq.png",      href: "/shop/screens" },
          { name: "Toshiba",    img: "/brands/toshiba.jpeg",  href: "/shop/copiers" },
          { name: "Diplomat",   img: "/brands/diplomat.png",  href: "/shop/safes-filing" },
          { name: "Seiko",      img: "/brands/seiko.png",     href: "/shop/time-recorders" },
          { name: "Intimus",    img: "/brands/intimus.png",   href: "/shop" },
          { name: "Targus",     img: "/brands/targus.png",    href: "/shop/accessories" },
          { name: "Dynabook",   img: "/brands/dynabook.png",  href: "/shop" },
          { name: "Lion Steel", img: "/brands/lionSteel.png", href: "/shop/safes-filing" },
          { name: "Clip",       img: "/brands/clip.jpg",      href: "/shop" },
        ];
        const row1 = [...all, ...all];

        const Card = ({ name, img, href }: { name: string; img: string; href: string }) => (
          <Link
            href={href}
            className="group brand-logo-card shrink-0 w-44 h-28 lg:w-56 lg:h-32 mx-3 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/8 hover:border-blue-500/30 flex items-center justify-center overflow-hidden transition-all duration-400 relative"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)" }}
            />
            <Image
              src={img}
              alt={name}
              width={120}
              height={72}
              className="object-contain max-h-14 lg:max-h-16 transition-all duration-500 group-hover:scale-110"
            />
          </Link>
        );

        return (
          <section className="relative bg-slate-950 py-16 overflow-hidden">
            {/* Top + bottom fade */}
            <div className="absolute inset-x-0 top-0 h-12 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, #020617, transparent)" }} />
            <div className="absolute inset-x-0 bottom-0 h-12 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, #020617, transparent)" }} />
            {/* Left + right fade */}
            <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #020617, transparent)" }} />
            <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #020617, transparent)" }} />

            {/* Row 1 — LTR */}
            <div className="brand-row flex overflow-hidden">
              <div className="animate-marquee-ltr-fast flex">
                {row1.map((b, i) => <Card key={`r1-${i}`} {...b} />)}
              </div>
            </div>
          </section>
        );
      })()}

    </div>
  );
}
