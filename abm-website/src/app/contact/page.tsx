import type { Metadata } from "next";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { ContactForm } from "./contact-form";
import { MapsSection } from "./maps-section";
import { BRAND_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ABM Kuwait for product enquiries, quotes and after-sales support.",
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-slate-950 text-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">
              Get in touch
            </p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-5">
              We&apos;re here
              <br />
              <span className="text-gradient-blue">to help.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="text-white/50 text-lg max-w-lg">
              Product enquiries, bulk orders, maintenance support — our team responds within 24 hours.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Form */}
          <AnimateIn type="left">
            <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
            <ContactForm />
          </AnimateIn>

          {/* Info */}
          <div className="space-y-5">
            <AnimateIn type="right">
              <h2 className="text-xl font-bold text-white mb-6">Contact Details</h2>
            </AnimateIn>

            {/* WhatsApp */}
            <AnimateIn type="right" delay={60}>
              <a
                href={`https://wa.me/${BRAND_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border border-green-500/20 hover:border-green-500/40 bg-green-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="h-6 w-6 text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-bold text-white">WhatsApp</p>
                  <p className="text-sm text-slate-400">Click to start a conversation</p>
                </div>
              </a>
            </AnimateIn>

            {/* Admin */}
            <AnimateIn type="right" delay={120}>
              <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] space-y-3 hover:border-blue-500/30 transition-colors">
                <p className="font-bold text-white">Administration Office</p>
                <div className="space-y-2 text-sm">
                  {[
                    { icon: MapPin, content: BRAND_INFO.adminAddress },
                    { icon: Phone, content: `${BRAND_INFO.phone1}  ·  ${BRAND_INFO.phone2}`, href: `tel:${BRAND_INFO.phone1}` },
                    { icon: Mail, content: BRAND_INFO.email, href: `mailto:${BRAND_INFO.email}` },
                    { icon: Clock, content: BRAND_INFO.hours },
                  ].map(({ icon: Icon, content, href }) => (
                    <div key={content} className="flex items-start gap-3 text-slate-400">
                      <Icon className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" strokeWidth={1.6} />
                      {href ? (
                        <a href={href} className="hover:text-blue-400 transition-colors">{content}</a>
                      ) : (
                        <span>{content}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Workshop */}
            <AnimateIn type="right" delay={180}>
              <div className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] space-y-3 hover:border-blue-500/30 transition-colors">
                <p className="font-bold text-white">Workshop &amp; Maintenance</p>
                <div className="space-y-2 text-sm">
                  {[
                    { icon: MapPin, content: BRAND_INFO.workshopAddress },
                    { icon: Phone, content: BRAND_INFO.workshopPhone, href: `tel:${BRAND_INFO.workshopPhone}` },
                    { icon: Clock, content: BRAND_INFO.workshopHours },
                  ].map(({ icon: Icon, content, href }) => (
                    <div key={content} className="flex items-start gap-3 text-slate-400">
                      <Icon className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" strokeWidth={1.6} />
                      {href ? (
                        <a href={href} className="hover:text-blue-400 transition-colors">{content}</a>
                      ) : (
                        <span>{content}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* Maps */}
        <div className="mt-14 lg:mt-20">
          <AnimateIn>
            <MapsSection />
          </AnimateIn>
        </div>
      </div>
    </div>
  );
}
