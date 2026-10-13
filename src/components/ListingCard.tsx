import type { Listing } from '@/types';
import { categories } from '@/types';
import {
  MapPin,
  ArrowUpRight,
  MessageSquare,
  User,
  Clock,
  HandHeart,
  HelpCircle,
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onConnect: (listing: Listing) => void;
}

export function ListingCard({ listing, onConnect }: ListingCardProps) {
  const category = categories.find((c) => c.id === listing.category);
  const isOffering = listing.type === 'offering';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-850 transition-all duration-300 hover:border-ink-700 hover:bg-ink-800">
      {/* Top accent line */}
      <div
        className={`h-1 w-full ${isOffering ? 'bg-gradient-to-r from-crimson-600 to-crimson-400' : 'bg-gradient-to-r from-ink-600 to-ink-500'}`}
      />

      <div className="flex flex-1 flex-col p-5">
        {/* Type badge + category */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isOffering
                ? 'bg-crimson-950/40 text-crimson-400 border border-crimson-900/40'
                : 'bg-ink-800 text-ink-300 border border-ink-700'
            }`}
          >
            {isOffering ? <HandHeart className="h-3 w-3" /> : <HelpCircle className="h-3 w-3" />}
            {isOffering ? 'Offering' : 'Requesting'}
          </span>
          <span className="text-xs font-medium text-ink-400">
            {category?.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold leading-snug text-ink-100 transition-colors group-hover:text-white">
          {listing.title}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-400 line-clamp-3">
          {listing.description}
        </p>

        {/* Location */}
        <div className="mb-4 flex items-center gap-1.5 text-sm text-ink-300">
          <MapPin className="h-4 w-4 text-crimson-400" />
          <span className="font-medium">{listing.location}</span>
        </div>

        {/* Divider */}
        <div className="my-1 border-t border-ink-700/60" />

        {/* Footer: user, time, button */}
        <div className="flex items-center justify-between gap-3 pt-4">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-ink-400">
              <User className="h-3 w-3 flex-shrink-0" />
              <span className="truncate font-medium text-ink-300">{listing.postedBy}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-500">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>{listing.postedAt}</span>
            </div>
          </div>

          <button
            onClick={() => onConnect(listing)}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-ink-700 px-3.5 py-2 text-sm font-medium text-ink-100 transition-all duration-300 hover:bg-crimson-600 hover:text-white"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Connect</span>
            <ArrowUpRight className="h-3.5 w-3.3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
