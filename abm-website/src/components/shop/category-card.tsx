import Link from "next/link";
import {
  Printer,
  Tag,
  Droplet,
  BookMarked,
  Copy,
  ScanLine,
  Projector,
  Monitor,
  MonitorSmartphone,
  Scissors,
  Clock,
  Lock,
  Package,
  ChevronRight,
} from "lucide-react";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ElementType> = {
  Printer,
  Tag,
  Droplet,
  BookMarked,
  Copy,
  ScanLine,
  Projector,
  Monitor,
  MonitorSmartphone,
  Scissors,
  Clock,
  Lock,
  Package,
};

const categoryGradients = [
  "from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100",
  "from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100",
  "from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100",
  "from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100",
  "from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100",
  "from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100",
  "from-cyan-50 to-sky-50 hover:from-cyan-100 hover:to-sky-100",
  "from-fuchsia-50 to-violet-50 hover:from-fuchsia-100 hover:to-violet-100",
  "from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100",
  "from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100",
  "from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100",
  "from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100",
  "from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100",
];

interface CategoryCardProps {
  category: Category;
  index?: number;
  productCount?: number;
}

export function CategoryCard({ category, index = 0, productCount }: CategoryCardProps) {
  const Icon = categoryIcons[category.icon || "Package"] || Package;
  const gradient = categoryGradients[index % categoryGradients.length];

  return (
    <Link
      href={`/shop/${category.slug}`}
      className={cn(
        "group flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-200 bg-gradient-to-br transition-all duration-300 hover:shadow-md hover:border-blue-200 text-center",
        gradient
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-white/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
          {category.name}
        </h3>
        {productCount !== undefined && (
          <p className="text-xs text-slate-500 mt-0.5">{productCount} products</p>
        )}
      </div>
      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
