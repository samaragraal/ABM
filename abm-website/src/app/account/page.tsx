import type { Metadata } from "next";
import Link from "next/link";
import { Package, User, MapPin, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "My Account",
};

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">My Account</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your orders and account settings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* User summary */}
        <div className="md:col-span-3 bg-white/[0.04] rounded-2xl border border-white/[0.07] p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-slate-800 flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div>
            <p className="font-bold text-white">Ahmed Al-Rashid</p>
            <p className="text-sm text-slate-400">ahmed@example.com</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto gap-2 border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.06]">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Quick links */}
        {[
          {
            icon: Package,
            label: "My Orders",
            desc: "Track and manage your orders",
            href: "/account/orders",
            color: "text-blue-400 bg-blue-500/10",
          },
          {
            icon: User,
            label: "Profile",
            desc: "Update your personal details",
            href: "/account/profile",
            color: "text-purple-400 bg-purple-500/10",
          },
          {
            icon: MapPin,
            label: "Addresses",
            desc: "Manage delivery addresses",
            href: "/account/addresses",
            color: "text-green-400 bg-green-500/10",
          },
          {
            icon: Settings,
            label: "Settings",
            desc: "Account preferences",
            href: "/account/settings",
            color: "text-slate-400 bg-white/[0.06]",
          },
        ].map(({ icon: Icon, label, desc, href, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white/[0.03] rounded-2xl border border-white/[0.07] p-5 flex items-start gap-4 hover:border-blue-500/30 hover:bg-white/[0.06] transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                {label}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
