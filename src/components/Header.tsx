import { Plus, Users, MapPin } from 'lucide-react';

interface HeaderProps {
  totalListings: number;
  onPostClick: () => void;
}

export function Header({ totalListings, onPostClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/80 bg-ink-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-crimson-600 to-crimson-800 shadow-lg shadow-crimson-900/30">
            <span className="text-lg font-extrabold text-white">S</span>
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-crimson-400 ring-2 ring-ink-950" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-ink-100 sm:text-lg">
              SkillBridge <span className="text-crimson-500">Pakistan</span>
            </h1>
            <p className="hidden text-xs text-ink-400 sm:block">Share skills. Build community.</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-ink-800 bg-ink-900 px-3.5 py-2 md:flex">
            <Users className="h-4 w-4 text-crimson-400" />
            <span className="text-sm font-medium text-ink-300">
              <span className="text-ink-100">{totalListings}</span> active listings
            </span>
          </div>

          <div className="hidden items-center gap-1.5 rounded-full border border-ink-800 bg-ink-900 px-3.5 py-2 text-xs font-medium text-ink-400 lg:flex">
            <MapPin className="h-3.5 w-3.5 text-crimson-400" />
            Pakistan
          </div>

          <button
            onClick={onPostClick}
            className="flex items-center gap-2 rounded-xl bg-crimson-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-crimson-900/30 transition-all duration-300 hover:bg-crimson-700 hover:shadow-crimson-900/40"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Post a Skill</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>
      </div>
    </header>
  );
}
