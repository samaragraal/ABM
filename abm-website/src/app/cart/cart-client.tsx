"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

export function CartPageClient() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="h-10 w-10 text-slate-300" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8">
          You haven&apos;t added any products yet. Browse our catalogue to get started.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Your Cart
        <span className="ml-2 text-base font-normal text-slate-400">
          ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4"
            >
              {/* Image */}
              <Link href={`/shop/${item.product.categorySlug}/${item.product.slug}`}>
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <span className="text-2xl font-black text-slate-200">
                    {item.product.brand[0]}
                  </span>
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-600 font-medium">{item.product.brand}</p>
                <Link
                  href={`/shop/${item.product.categorySlug}/${item.product.slug}`}
                  className="text-sm font-semibold text-slate-900 hover:text-blue-700 transition-colors line-clamp-2"
                >
                  {item.product.name}
                </Link>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity control */}
                  <div className="flex items-center gap-1 border border-slate-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-slate-50 rounded-l-lg transition-colors text-slate-600"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-semibold text-slate-800 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-slate-50 rounded-r-lg transition-colors text-slate-600"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-800">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24">
            <h2 className="font-bold text-slate-900 mb-4">Order Summary</h2>

            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-slate-600">
                  <span className="line-clamp-1 flex-1 pr-2">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold text-base mb-1">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-slate-400 mb-5">Shipping calculated at checkout</p>

            <Button asChild size="lg" className="w-full gap-2">
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Link
              href="/shop"
              className="block text-center text-sm text-blue-600 hover:underline mt-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
