"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { searchProducts } from "@/lib/mock-data";
import type { Product } from "@/types";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus & body scroll
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Compute results synchronously — no setState-in-effect
  const results: Product[] = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchProducts(query).slice(0, 8);
  }, [query]);

  function handleClose() {
    setQuery("");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-200">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, brands, categories…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors pl-2 border-l border-slate-200"
          >
            Close
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-96 overflow-y-auto divide-y divide-slate-100">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/shop/${product.categorySlug}/${product.slug}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors group"
                  onClick={handleClose}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    <span className="text-sm font-black text-slate-300">
                      {product.brand[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-700">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {product.brand} · {product.categoryName}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-800">
                      {formatPrice(product.price)}
                    </p>
                    <ArrowRight className="h-3 w-3 text-blue-400 ml-auto" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : query.length >= 2 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-slate-500 text-sm">
              No products found for &quot;<span className="font-medium">{query}</span>&quot;
            </p>
          </div>
        ) : (
          <div className="px-4 py-6">
            <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wider">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {["Brother printer", "Label printer", "Shredder", "Ink cartridge", "Safe", "Scanner"].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
