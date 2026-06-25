import type { Metadata } from "next";
import { Shield, Award, Wrench, Users, MapPin, Phone, Clock } from "lucide-react";
import { AnimateIn, StaggerGroup } from "@/components/ui/animate-in";
import { BRAND_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About ABM Kuwait",
  description: "Learn about ABM Kuwait — Kuwait's premier office equipment partner and authorized Brother dealer.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-slate-950 text-white py-24 lg:py-36 overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-5xl mx-auto px-5 lg:px-8 relative">
          <AnimateIn>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-5">
              Our story
            </p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.0] mb-7">
              Powering Kuwait&apos;s
              <br />
              <span className="text-gradient-blue">Offices Since 2010.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={160}>
            <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
              ABM Kuwait is an authorized dealer for Brother and other leading brands, providing
              businesses across Kuwait with quality office equipment, genuine consumables and
              professional maintenance services.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: "100% Genuine", desc: "Direct from manufacturers. Full warranty on all products." },
              { icon: Award, title: "Authorized Dealer", desc: "Official Brother dealer with complete product range access." },
              { icon: Wrench, title: "Workshop Service", desc: "Dedicated maintenance facility at Kuwait Free Zone." },
              { icon: Users, title: "Expert Team", desc: "Knowledgeable staff to guide your purchasing decisions." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-7 rounded-3xl border border-white/[0.07] bg-white/[0.03] hover:border-blue-500/30 hover:bg-white/[0.06] transition-all duration-500">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.06] group-hover:bg-blue-500/20 flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" strokeWidth={1.6} />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Story */}
      <section className="border-y border-white/[0.06] py-20 lg:py-28 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <AnimateIn>
            <h2 className="text-3xl font-black text-white tracking-tight mb-7">Who We Are</h2>
          </AnimateIn>
          <div className="space-y-5">
            {[
              "ABM Kuwait was founded with a single mission: to be the most reliable office equipment partner for businesses in Kuwait. Over the years, we have built a reputation for quality products, fair pricing and exceptional after-sales support.",
              "As an authorized Brother dealer, we carry the full range of Brother printers, multifunction devices, label printers, scanners and consumables. We also supply paper shredders, fire-resistant safes, time recorders, projectors and interactive screens from trusted global brands.",
              "Our dedicated workshop and maintenance facility ensures that every product we sell is backed by professional technical support. Whether you need a single ink cartridge or a complete fleet of office printers, ABM Kuwait is your one-stop shop.",
            ].map((text, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <p className="text-slate-400 leading-relaxed text-lg">{text}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <AnimateIn className="mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight">Our Locations</h2>
          </AnimateIn>

          <StaggerGroup className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Administration Office",
                icon: MapPin,
                address: BRAND_INFO.adminAddress,
                phones: [BRAND_INFO.phone1, BRAND_INFO.phone2],
                hours: BRAND_INFO.hours,
              },
              {
                title: "Workshop & Maintenance",
                icon: Wrench,
                address: BRAND_INFO.workshopAddress,
                phones: [BRAND_INFO.workshopPhone],
                hours: BRAND_INFO.workshopHours,
              },
            ].map(({ title, icon: Icon, address, phones, hours }) => (
              <div key={title} className="p-7 rounded-3xl border border-white/[0.07] bg-white/[0.03] hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-400" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-bold text-white">{title}</h3>
                </div>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-start gap-2.5 text-slate-400">
                    <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" strokeWidth={1.6} />
                    <span>{address}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Phone className="h-4 w-4 text-blue-400 shrink-0" strokeWidth={1.6} />
                    <div className="flex gap-2">
                      {phones.map((phone) => (
                        <a key={phone} href={`tel:${phone}`} className="hover:text-blue-400 transition-colors">{phone}</a>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Clock className="h-4 w-4 text-blue-400 shrink-0" strokeWidth={1.6} />
                    <span>{hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  );
}
