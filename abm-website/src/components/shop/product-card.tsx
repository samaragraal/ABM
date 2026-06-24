"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, CheckCircle, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (product.isComingSoon || !product.inStock) return;
    addItem(product);
    setAdded(true);
    toast.success("Added to cart");
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link
      href={`/shop/${product.categorySlug}/${product.slug}`}
      className="product-card group relative flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-slate-300 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-1.5">
        {discount && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-500 text-white">
            -{discount}%
          </span>
        )}
        {product.isNew && !discount && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white">
            New
          </span>
        )}
        {product.isComingSoon && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white">
            Soon
          </span>
        )}
      </div>

      {/* Arrow button - top right, appears on hover */}
      <div className={cn(
        "absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center transition-all duration-300",
        hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
      )}>
        <ArrowUpRight className="h-3.5 w-3.5 text-white" />
      </div>

      {/* Product image area */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              "object-contain p-4 transition-transform duration-500",
              hovered ? "scale-[1.06]" : "scale-100"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, #0f172a 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "flex flex-col items-center gap-3 transition-transform duration-500",
                hovered ? "scale-105" : "scale-100"
              )}>
                <div className={cn(
                  "w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-300",
                  hovered
                    ? "bg-blue-50 border-blue-100 shadow-lg shadow-blue-100"
                    : "bg-white border-slate-100 shadow-sm"
                )}>
                  <span className={cn(
                    "text-2xl font-black transition-colors duration-300",
                    hovered ? "text-blue-200" : "text-slate-100"
                  )}>
                    {product.brand[0]}
                  </span>
                </div>
                <span className={cn(
                  "text-[11px] font-semibold tracking-wide uppercase transition-colors duration-300",
                  hovered ? "text-blue-400" : "text-slate-300"
                )}>
                  {product.brand}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 gap-3 flex-1">
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {product.categoryName}
          </p>
          <h3 className={cn(
            "text-sm font-semibold leading-snug line-clamp-2 transition-colors duration-200",
            hovered ? "text-blue-700" : "text-slate-900"
          )}>
            {product.name}
          </h3>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            {product.isComingSoon ? (
              <span className="text-sm text-slate-400">TBA</span>
            ) : (
              <>
                <span className="text-base font-bold text-slate-900 tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-xs text-slate-300 line-through tabular-nums">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={product.isComingSoon || !product.inStock}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 btn-press",
              added
                ? "bg-green-500 text-white"
                : product.isComingSoon || !product.inStock
                ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-md hover:shadow-blue-600/20"
            )}
          >
            {added ? (
              <CheckCircle className="h-3.5 w-3.5" />
            ) : (
              <ShoppingCart className="h-3.5 w-3.5" />
            )}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}
