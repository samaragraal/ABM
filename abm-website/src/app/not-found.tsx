import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
        <Search className="h-10 w-10 text-slate-300" />
      </div>
      <h1 className="text-6xl font-black text-slate-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h2>
      <p className="text-slate-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3 justify-center">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
}
