import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-slate-900 items-center justify-center mb-4">
            <span className="text-white font-black text-xs">ABM</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your ABM Kuwait account</p>
        </div>

        <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-6">
          <LoginForm />

          <p className="text-center text-sm text-slate-400 mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-400 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
