import { useEffect } from 'react';
import type { Listing } from '@/types';
import { X, MessageSquare, MapPin, User, Check } from 'lucide-react';

interface ConnectModalProps {
  listing: Listing | null;
  onClose: () => void;
}

export function ConnectModal({ listing, onClose }: ConnectModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (listing) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [listing, onClose]);

  if (!listing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ink-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson-600/15 text-crimson-500">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-ink-100">Connect</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-800 hover:text-ink-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="mb-4 rounded-xl border border-ink-800 bg-ink-850 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-crimson-400">
              {listing.type === 'offering' ? 'Offering' : 'Requesting'}
            </p>
            <h3 className="mb-2 font-semibold text-ink-100">{listing.title}</h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-400">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {listing.postedBy}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {listing.location}
              </span>
            </div>
          </div>

          <div className="mb-5 flex items-start gap-3 rounded-xl bg-crimson-950/20 border border-crimson-900/30 p-4">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-crimson-400" />
            <p className="text-sm text-ink-300">
              Your interest has been noted. <span className="font-semibold text-ink-100">{listing.postedBy}</span> will receive a notification. They can reach out to continue the conversation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-ink-800 py-2.5 text-sm font-medium text-ink-200 transition-colors hover:bg-ink-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
