import React from 'react';
import { Flame, MapPin, Phone, MessageSquare, Globe, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';
import { BRANCHES } from '../data/branches';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-neutral-900 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-amber-500/30 bg-neutral-950 flex items-center justify-center p-0.5">
                <img
                  src={RESTAURANT_INFO.logoUrl}
                  alt="Mamboz Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-lg font-bold text-white font-display uppercase tracking-wide">
                MAMBOZ <span className="text-amber-500">CORNER BBQ</span>
              </span>
            </div>

            <p className="text-neutral-400 max-w-md leading-relaxed">
              Dar es Salaam’s iconic open-flame barbecue house. Dedicated to authentic charcoal Mishkaki, Sekela chicken, Nundu, royal Dum Biryani, and traditional tandoori delicacies.
            </p>

            <div className="pt-1 flex items-center gap-3 text-neutral-500">
              <span className="flex items-center gap-1 text-amber-500/90 font-semibold">
                <Flame className="w-3.5 h-3.5" />
                Pure Charcoal Grilling
              </span>
              <span>•</span>
              <span>Dar es Salaam, TZ</span>
            </div>
          </div>

          {/* Col 2: Branches Quick List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Dar es Salaam Locations
            </h4>
            <ul className="space-y-2 text-neutral-300">
              {BRANCHES.map((b) => (
                <li key={b.id} className="flex items-start gap-1.5">
                  <MapPin className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">{b.area}:</span>{' '}
                    <span className="text-neutral-400">{b.address}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Hotline & Ordering */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Customer Hotlines
            </h4>
            <div className="space-y-2">
              <a
                href="tel:+255784243735"
                className="flex items-center gap-2 text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+255 784 243735 (Kisutu)</span>
              </a>
              <a
                href="tel:+255784243736"
                className="flex items-center gap-2 text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+255 784 243736 (Mikocheni)</span>
              </a>
              <a
                href="tel:+255689626269"
                className="flex items-center gap-2 text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+255 689 626269 (GSP Oysterbay)</span>
              </a>

              <div className="pt-2">
                <a
                  href={RESTAURANT_INFO.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{RESTAURANT_INFO.website}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Mamboz Corner BBQ. All rights reserved. All prices quoted in Tanzanian Shillings (TZS /=).</p>
          <p className="flex items-center gap-1">
            Crafted for BBQ lovers in Dar es Salaam <Flame className="w-3 h-3 text-amber-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
