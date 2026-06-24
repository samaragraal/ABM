import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "My Orders",
};

const mockOrders = [
  {
    id: "ABM-1719230000",
    date: "June 24, 2026",
    status: "delivered" as const,
    total: 175.0,
    items: ["DCP-T730DW Brother Printer", "BTD60BK Brother Toner ×2"],
  },
  {
    id: "ABM-1719100000",
    date: "June 20, 2026",
    status: "processing" as const,
    total: 39.0,
    items: ["PT-D460BT Brother Label Printer"],
  },
];

const statusConfig = {
  pending: { label: "Pending", variant: "warning" as const },
  processing: { label: "Processing", variant: "default" as const },
  shipped: { label: "Shipped", variant: "secondary" as const },
  delivered: { label: "Delivered", variant: "success" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
};

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/account" className="hover:text-slate-700">My Account</Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
        <span className="text-slate-800 font-medium">Orders</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Orders</h1>

      {mockOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Package className="h-12 w-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500">You haven&apos;t placed any orders yet.</p>
          <Button asChild className="mt-4">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => {
            const status = statusConfig[order.status];
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-slate-900">{order.id}</p>
                    <p className="text-sm text-slate-500">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <span className="font-bold text-slate-800">
                      {order.total.toFixed(3)} KD
                    </span>
                  </div>
                </div>
                <ul className="text-sm text-slate-500 space-y-0.5">
                  {order.items.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
