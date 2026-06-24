import type { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminPage() {
  const totalProducts = PRODUCTS.length;
  const inStock = PRODUCTS.filter((p) => p.inStock && !p.isComingSoon).length;

  const stats = [
    {
      icon: Package,
      label: "Total Products",
      value: totalProducts.toString(),
      sub: `${inStock} in stock`,
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: "24",
      sub: "This month",
      color: "text-green-600 bg-green-50",
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: "2,450.500 KD",
      sub: "This month",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: TrendingUp,
      label: "Avg. Order Value",
      value: "102.104 KD",
      sub: "This month",
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage products, orders and site settings</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/admin/settings">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button asChild size="sm" className="gap-2">
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm font-medium text-slate-600">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Quick nav */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Package, label: "Products", desc: `${totalProducts} total products`, href: "/admin/products" },
          { icon: ShoppingBag, label: "Orders", desc: "24 orders this month", href: "/admin/orders" },
          { icon: BarChart3, label: "Analytics", desc: "View sales reports", href: "/admin/analytics" },
        ].map(({ icon: Icon, label, desc, href }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 hover:border-blue-200 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 group-hover:text-blue-700">{label}</p>
              <p className="text-sm text-slate-500">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent products */}
      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="font-bold text-slate-800">Recent Products</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/products">View All</Link>
          </Button>
        </div>
        <div className="divide-y divide-slate-100">
          {PRODUCTS.slice(0, 8).map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-black text-slate-300">{product.brand[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 line-clamp-1">{product.name}</p>
                <p className="text-xs text-slate-400">{product.categoryName} · {product.brand}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-slate-800">{formatPrice(product.price)}</p>
                <span className={`text-xs font-medium ${product.inStock && !product.isComingSoon ? "text-green-600" : product.isComingSoon ? "text-amber-500" : "text-red-500"}`}>
                  {product.isComingSoon ? "Coming Soon" : product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
