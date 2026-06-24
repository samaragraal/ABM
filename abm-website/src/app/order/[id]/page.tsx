import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Package, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
      <p className="text-slate-500 text-lg mb-1">Thank you for your order.</p>
      <p className="text-slate-400 text-sm mb-8">
        Order ID: <span className="font-mono font-semibold text-slate-600">{id}</span>
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-left space-y-4 mb-8">
        <div className="flex items-start gap-3">
          <Package className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-800">What happens next?</p>
            <p className="text-sm text-slate-500 mt-1">
              Our team will review your order and contact you within 24 hours to
              confirm availability and arrange delivery.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-800">Need immediate assistance?</p>
            <p className="text-sm text-slate-500 mt-1">
              Call us at{" "}
              <a href={`tel:${BRAND_INFO.phone1}`} className="text-blue-600 font-medium hover:underline">
                {BRAND_INFO.phone1}
              </a>{" "}
              or{" "}
              <a
                href={`https://wa.me/${BRAND_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-medium hover:underline"
              >
                WhatsApp us
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/account/orders">View My Orders</Link>
        </Button>
      </div>
    </div>
  );
}
