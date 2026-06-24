import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
        <Link href="/account" className="hover:text-slate-700">My Account</Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
        <span className="text-slate-800 font-medium">Profile</span>
      </nav>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h1>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input defaultValue="Ahmed Al-Rashid" />
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input defaultValue="69008879" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input type="email" defaultValue="ahmed@example.com" />
        </div>
        <Button className="w-full sm:w-auto">Save Changes</Button>
      </div>
    </div>
  );
}
