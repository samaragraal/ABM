import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimateIn, StaggerGroup } from "@/components/ui/animate-in";
import { ProductCard } from "@/components/shop/product-card";
import { CATEGORIES } from "@/lib/constants";
import { getProductsByCategory } from "@/lib/mock-data";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: "Not Found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="border-b border-white/[0.06] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/shop" className="hover:text-slate-300 transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-300 font-medium">{category.name}</span>
          </nav>

          <AnimateIn>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              {products.length} products
            </p>
          </AnimateIn>
          <AnimateIn delay={60}>
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {category.name}
            </h1>
          </AnimateIn>
          {category.description && (
            <AnimateIn delay={120}>
              <p className="text-slate-400 text-lg mt-3 max-w-lg">{category.description}</p>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        {products.length > 0 ? (
          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGroup>
        ) : (
          <div className="py-24 text-center">
            <p className="text-slate-400">No products in this category yet.</p>
            <Link href="/shop" className="text-blue-600 text-sm mt-3 inline-block hover:underline">
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
