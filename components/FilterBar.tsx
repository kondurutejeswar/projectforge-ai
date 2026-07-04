'use client';

import { Domain, Tier } from '@/lib/types';

interface FilterBarProps {
  domains: Domain[];
  tiers: Tier[];
  activeDomain: string | null;
  activeTier: string | null;
  search: string;
  onDomainChange: (d: string | null) => void;
  onTierChange: (t: string | null) => void;
  onSearchChange: (v: string) => void;
}

export default function FilterBar({
  domains,
  tiers,
  activeDomain,
  activeTier,
  search,
  onDomainChange,
  onTierChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="glass-panel p-5 sm:p-6 mb-10 space-y-5">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search projects, e.g. 'chatbot', 'YOLO', 'IoT'..."
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-signal-green/60 focus:ring-1 focus:ring-signal-green/40"
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-500 mr-1">TIER:</span>
        <Chip active={activeTier === null} onClick={() => onTierChange(null)}>
          All
        </Chip>
        {tiers.map((t) => (
          <Chip key={t} active={activeTier === t} onClick={() => onTierChange(t)}>
            {t}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-500 mr-1">DOMAIN:</span>
        <Chip active={activeDomain === null} onClick={() => onDomainChange(null)}>
          All
        </Chip>
        {domains.map((d) => (
          <Chip key={d} active={activeDomain === d} onClick={() => onDomainChange(d)}>
            {d}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-mono ${
        active
          ? 'bg-signal-green text-base-950 border-signal-green font-semibold'
          : 'border-white/15 text-slate-300 hover:border-signal-green/50 hover:text-signal-green'
      }`}
    >
      {children}
    </button>
  );
}
