"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const LOCATIONS = [
  {
    id: "admin",
    label: "Administration Office",
    address: "Al-Qibla, Ali Al-Salem Street, Al-Jawhra Tower, Floor 21, Kuwait City",
    mapSrc:
      "https://maps.google.com/maps?q=Al-Jawhra+Tower+Ali+Al-Salem+Street+Kuwait+City+Kuwait&output=embed&hl=en&z=15",
  },
  {
    id: "workshop",
    label: "Workshop & Maintenance",
    address: "Kuwait Free Zone, Al-Arjan Complex, Gate 2, Kuwait",
    mapSrc:
      "https://maps.google.com/maps?q=Kuwait+Free+Zone+Al+Arjan+Complex+Kuwait&output=embed&hl=en&z=14",
  },
];

export function MapsSection() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-2 mb-5">
        {LOCATIONS.map((loc, i) => (
          <button
            key={loc.id}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              active === i
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            }`}
          >
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {loc.label}
          </button>
        ))}
      </div>

      {/* Address chip */}
      <p className="text-sm text-slate-500 mb-4 pl-1">
        {LOCATIONS[active].address}
      </p>

      {/* Map */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
        style={{ height: "420px" }}>
        {/* Loading shimmer behind the iframe */}
        <div className="absolute inset-0 shimmer" />
        {LOCATIONS.map((loc, i) => (
          <iframe
            key={loc.id}
            src={loc.mapSrc}
            title={loc.label}
            className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${
              active === i ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ))}
      </div>
    </div>
  );
}
