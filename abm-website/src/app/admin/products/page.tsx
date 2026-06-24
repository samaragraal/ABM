import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin — Products",
};

export default function AdminProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 text-sm">{PRODUCTS.length} products</p>
        </div>
        <Button asChild size="sm" className="gap-2">
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="search"
          placeholder="Search products…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-5 py-3 font-semibold text-slate-600">Product</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden lg:table-cell">Brand</th>
              <th className="text-right px-5 py-3 font-semibold text-slate-600">Price</th>
              <th className="text-center px-5 py-3 font-semibold text-slate-600 hidden sm:table-cell">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <p className="font-medium text-slate-800 line-clamp-1">{product.name}</p>
                  <p className="text-xs text-slate-400 md:hidden">{product.categoryName}</p>
                </td>
                <td className="px-5 py-3 hidden md:table-cell text-slate-600">{product.categoryName}</td>
                <td className="px-5 py-3 hidden lg:table-cell text-slate-600">{product.brand}</td>
                <td className="px-5 py-3 text-right font-semibold text-slate-800">
                  {formatPrice(product.price)}
                </td>
                <td className="px-5 py-3 hidden sm:table-cell text-center">
                  {product.isComingSoon ? (
                    <Badge variant="warning">Coming Soon</Badge>
                  ) : product.inStock ? (
                    <Badge variant="success">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </td>
                <td className="px-5 py-3">
                  <Button asChild variant="ghost" size="icon-sm">
                    <Link href={`/admin/products/${product.slug}`}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
