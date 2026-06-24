"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors duration-200"
      aria-label="Go back"
    >
      <span className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-slate-400 group-hover:bg-slate-50 flex items-center justify-center transition-all duration-200">
        <ArrowLeft className="h-3.5 w-3.5" />
      </span>
      Back
    </button>
  );
}
