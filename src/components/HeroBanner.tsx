import React from 'react';
import { Flame, Phone, MessageSquare, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Branch } from '../types';

interface HeroBannerProps {
  selectedBranch: Branch;
  onOpenBranchesModal: () => void;
  onScrollToMenu: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedBranch,
  onOpenBranchesModal,
  onScrollToMenu,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#15171a] via-[#0f1012] to-[#0c0d0e] border-b border-neutral-800/80 pt-6 pb-8 sm:py-10">
      {/* Subtle charcoal glow overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/30 via-red-950/20 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Column: Heading & Branding */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Dar es Salaam’s Premier Charcoal BBQ & Tandoori</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-display leading-[1.1]">
              FLAME-GRILLED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">MISHKAKI, SEKELA & BIRYANI</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
              Authentic Tanzanian barbecue charred over smoking lump charcoal. Legendary Nundu, Sururu, Vurugu sharing platters, succulent Chicken Tikka, fresh naan, and artisanal fruit shakes.
            </p>

            {/* Current Selected Branch Info Card */}
            <div className="mt-4 p-3 sm:p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                      Selected Branch:
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {selectedBranch.name}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {selectedBranch.address} ({selectedBranch.landmark})
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500/80" />
                      {selectedBranch.hours}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3 h-3" />
                      Official Mamboz Menu
                    </span>
                  </div>
                </div>
              </div>

              {/* Branch switch button */}
              <button
                onClick={onOpenBranchesModal}
                className="shrink-0 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors text-center"
              >
                Change Branch (4 Locations)
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={onScrollToMenu}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-black" />
                EXPLORE MENU
              </button>

              <a
                href={`https://wa.me/${selectedBranch.whatsappNumber}?text=${encodeURIComponent(`Hello Mamboz BBQ (${selectedBranch.area}), I would like to place an order from your digital menu.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm border border-emerald-500/40 active:scale-95 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                WhatsApp Branch
              </a>

              <a
                href={`tel:${selectedBranch.primaryPhone}`}
                className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs sm:text-sm border border-neutral-700 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                {selectedBranch.phoneNumbers[0]}
              </a>
            </div>
          </div>

          {/* Right Column: Mini Highlights Badges */}
          <div className="lg:w-80 shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-2.5 text-left">
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <div className="text-amber-400 font-bold text-xs uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Fresh Lump Charcoal
              </div>
              <p className="text-[12px] text-neutral-400 mt-1">
                Zero gas griddles. All skewers & sekela roasted over natural charcoal logs for smoky flavor.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <div className="text-amber-400 font-bold text-xs uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Clay Tandoor Oven
              </div>
              <p className="text-[12px] text-neutral-400 mt-1">
                Freshly slapped butter & garlic naan, tender chicken tikka and spiced seekh kebabs.
              </p>
            </div>

            <div className="col-span-2 lg:col-span-1 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <div className="text-emerald-400 font-bold text-xs uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Secure Mobile Checkout
              </div>
              <p className="text-[12px] text-neutral-400 mt-1">
                Order online with Vodacom M-Pesa, Tigo Pesa, Card or Direct WhatsApp dispatch.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
