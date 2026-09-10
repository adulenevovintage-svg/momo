import React from 'react';
import { MapPin, Phone, MessageSquare, ExternalLink, Globe, Clock, Flame, Check } from 'lucide-react';
import { Branch } from '../types';
import { BRANCHES } from '../data/branches';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface BranchesSectionProps {
  selectedBranch: Branch;
  onSelectBranch: (branch: Branch) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({
  selectedBranch,
  onSelectBranch,
}) => {
  return (
    <section id="contact-branches" className="py-12 sm:py-16 bg-[#0f1012] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Contact & Order Information
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-tight">
            MAMBOZ BRANCHES & DIRECT ORDERING
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Four prime locations across Dar es Salaam. Choose your nearest branch for table reservations, hot takeaway pick-up, or swift home delivery.
          </p>
        </div>

        {/* 4 Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {BRANCHES.map((branch) => {
            const isCurrent = selectedBranch.id === branch.id;

            return (
              <div
                key={branch.id}
                className={`rounded-2xl p-5 sm:p-6 transition-all relative flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-neutral-900 border-2 border-amber-500/80 shadow-xl shadow-amber-500/10'
                    : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white font-display">
                        {branch.name}
                      </h3>
                    </div>

                    {isCurrent ? (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-black flex items-center gap-1 shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" /> Active Menu
                      </span>
                    ) : (
                      <button
                        onClick={() => onSelectBranch(branch)}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors shrink-0"
                      >
                        Set Active
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 mt-3 text-xs sm:text-sm text-neutral-300">
                    <div className="flex items-start gap-2">
                      <span className="text-neutral-500 font-semibold w-16 shrink-0">Address:</span>
                      <span className="text-neutral-200">{branch.address}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-neutral-500 font-semibold w-16 shrink-0">Landmark:</span>
                      <span className="text-neutral-400">{branch.landmark}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-neutral-500 font-semibold w-16 shrink-0">Phone:</span>
                      <span className="text-amber-400 font-semibold tracking-wide">
                        {branch.phoneNumbers.join('  •  ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="text-neutral-400 text-xs">{branch.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Branch Direct Actions */}
                <div className="mt-5 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${branch.primaryPhone}`}
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    Call
                  </a>

                  <a
                    href={`https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(`Hello Mamboz BBQ (${branch.area}), I would like to order or reserve a table.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/60 text-emerald-200 text-xs font-bold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    WhatsApp
                  </a>

                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    Google Maps
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Official Website Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-neutral-400">Official Website</div>
              <div className="text-base font-bold text-white tracking-wide">
                {RESTAURANT_INFO.website}
              </div>
            </div>
          </div>

          <a
            href={RESTAURANT_INFO.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs tracking-wide transition-colors flex items-center gap-1.5"
          >
            <span>Visit mamboz.co.tz</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
