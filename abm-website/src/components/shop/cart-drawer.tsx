"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            <h2 className="font-bold text-slate-900">
              Cart
              {itemCount > 0 && (
                <span className="ml-2 text-sm font-normal text-slate-500">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-slate-300" />
              </div>
              <div>
                <p className="font-semibold text-slate-700">Your cart is empty</p>
                <p className="text-sm text-slate-400 mt-1">
                  Browse our products and add items to get started.
                </p>
              </div>
              <Button onClick={onClose} asChild>
                <Link href="/shop">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {items.map((item) => (
                <li key={item.product.id} className="p-4 flex gap-4">
                  {/* Product image */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    <span className="text-xl font-black text-slate-200">
                      {item.product.brand[0]}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-blue-600 font-medium">{item.product.brand}</p>
                    <p className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                      {item.product.name}
                    </p>
                    <p className="text-sm font-bold text-slate-800 mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity + remove */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-slate-50 transition-colors text-slate-600"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-semibold text-slate-800 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-slate-50 transition-colors text-slate-600"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Subtotal</span>
              <span className="text-lg font-bold text-slate-900">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Shipping and taxes calculated at checkout
            </p>
            <Separator />
            <div className="flex flex-col gap-2">
              <Button asChild size="lg" className="w-full gap-2" onClick={onClose}>
                <Link href="/checkout">
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full" onClick={onClose}>
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
