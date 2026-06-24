import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Admin — Orders",
};

const mockOrders = [
  { id: "ABM-1719230001", customer: "Ahmed Al-Rashid", date: "Jun 24, 2026", status: "processing" as const, total: 175.0, items: 3 },
  { id: "ABM-1719200001", customer: "Mohammed Al-Sabah", date: "Jun 20, 2026", status: "delivered" as const, total: 39.0, items: 1 },
  { id: "ABM-1719100001", customer: "Sara Al-Mutairi", date: "Jun 18, 2026", status: "shipped" as const, total: 445.0, items: 1 },
  { id: "ABM-1719000001", customer: "Khalid Al-Hamdan", date: "Jun 15, 2026", status: "delivered" as const, total: 258.0, items: 4 },
  { id: "ABM-1718900001", customer: "Noura Al-Rashidi", date: "Jun 10, 2026", status: "cancelled" as const, total: 85.0, items: 1 },
];

const statusConfig = {
  pending: { label: "Pending", variant: "warning" as const },
  processing: { label: "Processing", variant: "default" as const },
  shipped: { label: "Shipped", variant: "secondary" as const },
  delivered: { label: "Delivered", variant: "success" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
};

export default function AdminOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-500 text-sm">{mockOrders.length} orders</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-5 py-3 font-semibold text-slate-600">Order ID</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">Customer</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden lg:table-cell">Date</th>
              <th className="text-center px-5 py-3 font-semibold text-slate-600">Status</th>
              <th className="text-right px-5 py-3 font-semibold text-slate-600">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockOrders.map((order) => {
              const status = statusConfig[order.status];
              return (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-5 py-3">
                    <p className="font-mono font-semibold text-slate-800">{order.id}</p>
                    <p className="text-xs text-slate-400">{order.items} items</p>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-slate-600">{order.customer}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-slate-500">{order.date}</td>
                  <td className="px-5 py-3 text-center">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-800">
                    {order.total.toFixed(3)} KD
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
