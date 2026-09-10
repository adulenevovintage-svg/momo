import React from 'react';
import { X, MapPin, Phone, MessageSquare, ExternalLink, Check } from 'lucide-react';
import { Branch } from '../types';
import { BRANCHES } from '../data/branches';

interface BranchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBranch: Branch;
  onSelectBranch: (branch: Branch) => void;
}

export const BranchesModal: React.FC<BranchesModalProps> = ({
  isOpen,
  onClose,
  selectedBranch,
  onSelectBranch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-[#121316] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-neutral-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display uppercase">
                Select Mamboz Branch
              </h2>
              <p className="text-xs text-neutral-400">
                4 verified locations in Dar es Salaam, Tanzania
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Branch list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {BRANCHES.map((branch) => {
            const isSelected = selectedBranch.id === branch.id;

            return (
              <div
                key={branch.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/80 shadow-md shadow-amber-500/10'
                    : 'bg-neutral-900/70 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-white font-display">
                        {branch.name}
                      </h3>
                      {branch.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-amber-400 font-semibold border border-neutral-700">
                          {branch.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-300 mt-1 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{branch.address} ({branch.landmark})</span>
                    </p>

                    <div className="mt-2 text-xs text-neutral-400">
                      <span className="text-neutral-500 font-semibold">Hours:</span> {branch.hours}
                    </div>

                    <div className="mt-1 text-xs text-neutral-300">
                      <span className="text-neutral-500 font-semibold">Contact:</span> {branch.phoneNumbers.join(' / ')}
                    </div>
                  </div>

                  {/* Radio selection check */}
                  <button
                    onClick={() => {
                      onSelectBranch(branch);
                      onClose();
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-amber-500 text-black'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Active</span>
                      </>
                    ) : (
                      <span>Select</span>
                    )}
                  </button>
                </div>

                {/* Direct Action Links */}
                <div className="mt-3 pt-3 border-t border-neutral-800/80 flex flex-wrap gap-2 text-xs">
                  <a
                    href={`tel:${branch.primaryPhone}`}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    Call
                  </a>

                  <a
                    href={`https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(`Hello Mamboz BBQ ${branch.area}, I want to make an inquiry.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/70 text-emerald-300 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    WhatsApp
                  </a>

                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors ml-auto"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    Directions
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
