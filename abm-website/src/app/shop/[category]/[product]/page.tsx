import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, CheckCircle, ArrowRight } from "lucide-react";
import { AnimateIn, StaggerGroup } from "@/components/ui/animate-in";
import { BackButton } from "@/components/ui/back-button";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/shop/product-card";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { CATEGORIES } from "@/lib/constants";
import { getProductBySlug, getProductsByCategory } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

interface Props {
  params: Promise<{ category: string; product: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, product: slug } = await params;
  const product = getProductBySlug(category, slug);
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  const related = getProductsByCategory(categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 lg:py-12">
        {/* Back button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-10 flex-wrap">
          <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <Link href="/shop" className="hover:text-slate-700 transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          {category && (
            <>
              <Link href={`/shop/${categorySlug}`} className="hover:text-slate-700 transition-colors">
                {category.name}
              </Link>
              <ChevronRight className="h-3 w-3 text-slate-300" />
            </>
          )}
          <span className="text-slate-700 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product visual */}
          <AnimateIn type="left">
            <div className="sticky top-24">
              {/* Main image */}
              <div className="relative aspect-square bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden flex items-center justify-center">
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.025]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #0f172a 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* Glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 60%)",
                  }}
                />

                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-10"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="relative flex flex-col items-center gap-5">
                    <div className="w-28 h-28 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100 flex items-center justify-center">
                      <span className="text-5xl font-black text-slate-100">
                        {product.brand[0]}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-slate-200 tracking-tight">{product.brand}</p>
                      <p className="text-sm text-slate-400 mt-1">{product.categoryName}</p>
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {discount && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                      -{discount}%
                    </span>
                  )}
                  {product.isNew && !discount && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                      New
                    </span>
                  )}
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Product info */}
          <div className="flex flex-col gap-6">
            <AnimateIn>
              <div>
                <Link
                  href={`/shop/${categorySlug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-3 transition-colors group"
                >
                  {product.categoryName}
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-slate-400 font-medium">{product.brand}</p>
              </div>
            </AnimateIn>

            <AnimateIn delay={60}>
              {/* Price */}
              <div className="flex items-baseline gap-3">
                {product.isComingSoon ? (
                  <span className="text-xl font-semibold text-slate-400">Price to be announced</span>
                ) : (
                  <>
                    <span className="text-4xl font-black text-slate-900 tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-xl text-slate-300 line-through tabular-nums">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                    {discount && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600">
                        Save {discount}%
                      </span>
                    )}
                  </>
                )}
              </div>
            </AnimateIn>

            <AnimateIn delay={80}>
              {/* Stock */}
              <div className="flex items-center gap-2">
                {product.inStock && !product.isComingSoon ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" strokeWidth={2} />
                    <span className="text-sm font-semibold text-green-700">In Stock</span>
                  </>
                ) : product.isComingSoon ? (
                  <span className="text-sm font-semibold text-amber-600">Coming Soon</span>
                ) : (
                  <span className="text-sm font-semibold text-red-500">Out of Stock</span>
                )}
              </div>
            </AnimateIn>

            <Separator />

            <AnimateIn delay={100}>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </AnimateIn>

            <AnimateIn delay={120}>
              <AddToCartButton product={product} />
            </AnimateIn>

            <AnimateIn delay={140}>
              <p className="text-xs text-slate-400">
                Need bulk pricing?{" "}
                <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                  Contact us
                </Link>
              </p>
            </AnimateIn>
          </div>
        </div>

        {/* Specs */}
        {product.specs.length > 0 && (
          <div className="mt-20">
            <AnimateIn>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                Specifications
              </h2>
            </AnimateIn>

            <AnimateIn delay={60}>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {product.specs.map((spec, i) => (
                      <tr key={spec.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="px-5 py-3.5 font-semibold text-slate-600 w-2/5 lg:w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimateIn>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <AnimateIn>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">
                More in {product.categoryName}
              </h2>
            </AnimateIn>
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </StaggerGroup>
          </div>
        )}
      </div>
    </div>
  );
}
