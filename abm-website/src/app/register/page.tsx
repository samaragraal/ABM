import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-slate-900 items-center justify-center mb-4">
            <span className="text-white font-black text-xs">ABM</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create an account</h1>
          <p className="text-slate-500 text-sm mt-1">Start shopping with ABM Kuwait</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <RegisterForm />

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
