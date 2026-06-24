"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

type Step = "shipping" | "review" | "payment";

export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>("shipping");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    block: "",
    street: "",
    building: "",
    apartment: "",
    notes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handlePlaceOrder() {
    setIsSubmitting(true);
    // Simulate order placement
    await new Promise((r) => setTimeout(r, 1200));
    const orderId = `ABM-${Date.now()}`;
    clearCart();
    toast.success("Order placed successfully!");
    router.push(`/order/${orderId}`);
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h1>
        <Button asChild>
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: "shipping", label: "Shipping" },
    { id: "review", label: "Review" },
    { id: "payment", label: "Payment" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 text-sm font-medium ${step === s.id ? "text-blue-600" : step === "review" && s.id === "shipping" ? "text-green-600" : step === "payment" ? "text-green-600" : "text-slate-400"}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === s.id ? "bg-blue-600 text-white" : (step === "review" && i === 0) || step === "payment" ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                {i + 1}
              </span>
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="h-4 w-4 text-slate-300" />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === "shipping" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <h2 className="text-lg font-semibold text-slate-900">Shipping Details</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Ahmed Al-Rashid" required />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="6XXXXXXX" required />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <Label htmlFor="area">Area *</Label>
                  <Input id="area" name="area" value={form.area} onChange={handleChange} placeholder="Salmiya" required />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <Label htmlFor="block">Block *</Label>
                  <Input id="block" name="block" value={form.block} onChange={handleChange} placeholder="Block 12" required />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <Label htmlFor="street">Street *</Label>
                  <Input id="street" name="street" value={form.street} onChange={handleChange} placeholder="Street 5" required />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1.5">
                  <Label htmlFor="building">Building / Villa *</Label>
                  <Input id="building" name="building" value={form.building} onChange={handleChange} placeholder="Villa 10" required />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="apartment">Apartment / Floor (optional)</Label>
                  <Input id="apartment" name="apartment" value={form.apartment} onChange={handleChange} placeholder="Floor 3, Apt 5" />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label htmlFor="notes">Order Notes (optional)</Label>
                  <Input id="notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Special delivery instructions…" />
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  if (!form.name || !form.phone || !form.area || !form.block || !form.street || !form.building) {
                    toast.error("Please fill in all required fields");
                    return;
                  }
                  setStep("review");
                }}
              >
                Continue to Review
              </Button>
            </div>
          )}

          {step === "review" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <h2 className="text-lg font-semibold text-slate-900">Review Your Order</h2>

              {/* Shipping summary */}
              <div className="bg-slate-50 rounded-xl p-4 text-sm">
                <p className="font-semibold text-slate-700 mb-2">Shipping to</p>
                <p className="text-slate-600">{form.name} — {form.phone}</p>
                <p className="text-slate-600">{form.area}, Block {form.block}, Street {form.street}, {form.building}</p>
                {form.apartment && <p className="text-slate-500">{form.apartment}</p>}
              </div>

              {/* Items */}
              <ul className="divide-y divide-slate-100">
                {items.map((item) => (
                  <li key={item.product.id} className="flex items-center gap-3 py-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <span className="text-lg font-black text-slate-300">{item.product.brand[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-800 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("shipping")} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep("payment")} className="flex-1">
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <h2 className="text-lg font-semibold text-slate-900">Payment</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">Secure Payment</p>
                  <p className="text-sm text-blue-600">
                    We accept KNET, credit cards and cash on delivery. Payment will be
                    collected upon order confirmation.
                  </p>
                </div>
              </div>

              {/* Payment method selection */}
              <div className="space-y-2">
                {["Cash on Delivery", "KNET", "Credit / Debit Card"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors"
                  >
                    <input type="radio" name="payment" defaultChecked={method === "Cash on Delivery"} className="accent-blue-600" />
                    <span className="text-sm font-medium text-slate-700">{method}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("review")} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="flex-1"
                  size="lg"
                >
                  {isSubmitting ? "Placing Order…" : `Place Order — ${formatPrice(subtotal)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24">
            <h2 className="font-bold text-slate-900 mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-slate-600">
                  <span className="line-clamp-1 flex-1 pr-2">{item.product.name} × {item.quantity}</span>
                  <span className="font-medium shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span className="text-blue-600">{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
