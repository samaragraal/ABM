"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Account created! Welcome to ABM Kuwait.");
    router.push("/account");
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="Ahmed Al-Rashid" value={form.name} onChange={handleChange} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={handleChange} required minLength={8} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input id="confirm" name="confirm" type="password" placeholder="Repeat password" value={form.confirm} onChange={handleChange} required />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account…" : "Create Account"}
      </Button>
      <p className="text-xs text-slate-400 text-center">
        By registering, you agree to our terms and privacy policy.
      </p>
    </form>
  );
}
