"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="6XXXXXXX"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="subject">Subject *</Label>
        <Input
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Product enquiry, bulk order, maintenance…"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you…"
          rows={5}
          required
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
