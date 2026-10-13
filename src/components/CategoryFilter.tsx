import type { CategoryId } from '@/types';
import { categories } from '@/types';
import {
  Cpu,
  GraduationCap,
  Palette,
  HeartHandshake,
  LayoutGrid,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  GraduationCap,
  Palette,
  HeartHandshake,
};

interface CategoryFilterProps {
  active: CategoryId | 'all';
  onChange: (id: CategoryId | 'all') => void;
  counts: Record<string, number>;
}

export function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  const filters: { id: CategoryId | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All Listings', icon: LayoutGrid },
    ...categories.map((c) => ({
      id: c.id as CategoryId | 'all',
      label: c.label,
      icon: iconMap[c.icon] ?? LayoutGrid,
    })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = active === filter.id;
        const count = counts[filter.id] ?? 0;

        return (
          <button
            key={filter.id}
            onClick={() => onChange(filter.id)}
            className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-crimson-600 text-white shadow-lg shadow-crimson-900/40'
                : 'bg-ink-800 text-ink-300 hover:bg-ink-700 hover:text-ink-100 border border-ink-700'
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-ink-400 group-hover:text-crimson-400'} transition-colors`} />
            <span>{filter.label}</span>
            <span
              className={`ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                isActive ? 'bg-white/20 text-white' : 'bg-ink-700 text-ink-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
