import { useState, useEffect, useRef } from 'react';
import type { Listing, Message } from '@/types';
import { categories } from '@/types';
import {
  X,
  MapPin,
  User,
  Phone,
  Send,
  HandHeart,
  HelpCircle,
  Clock,
  Copy,
  Check,
  MessageSquare,
} from 'lucide-react';

interface MessageDrawerProps {
  listing: Listing | null;
  messages: Message[];
  onClose: () => void;
  onSend: (text: string) => void;
}

export function MessageDrawer({ listing, messages, onClose, onSend }: MessageDrawerProps) {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const thread = listing ? messages.filter((m) => m.listingId === listing.id) : [];

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thread.length]);

  useEffect(() => {
    setText('');
  }, [listing?.id]);

  if (!listing) return null;

  const category = categories.find((c) => c.id === listing.category);
  const isOffering = listing.type === 'offering';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(listing.contactPhone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-ink-700 bg-ink-900 shadow-2xl animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-ink-800 p-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-crimson-600/15 text-crimson-500">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-base font-bold text-ink-100">{listing.title}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-400">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                    isOffering
                      ? 'bg-crimson-950/40 text-crimson-400'
                      : 'bg-ink-800 text-ink-300'
                  }`}
                >
                  {isOffering ? <HandHeart className="h-2.5 w-2.5" /> : <HelpCircle className="h-2.5 w-2.5" />}
                  {isOffering ? 'Offering' : 'Requesting'}
                </span>
                <span className="text-ink-500">{category?.label}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-800 hover:text-ink-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Poster info + contact */}
        <div className="border-b border-ink-800 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-800 font-semibold text-crimson-400">
              {listing.postedBy.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-ink-100">{listing.postedBy}</p>
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {listing.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {listing.postedAt}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mb-3 rounded-lg border border-ink-800 bg-ink-850 p-3 text-xs leading-relaxed text-ink-300">
            {listing.description}
          </p>

          {/* Contact phone */}
          <div className="flex items-center justify-between rounded-lg border border-ink-700 bg-ink-850 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-crimson-400" />
              <div>
                <p className="text-xs text-ink-400">Contact</p>
                <p className="text-sm font-medium text-ink-100">{listing.contactPhone}</p>
              </div>
            </div>
            <button
              onClick={handleCopyPhone}
              className="flex items-center gap-1.5 rounded-lg bg-ink-800 px-2.5 py-1.5 text-xs font-medium text-ink-300 transition-colors hover:bg-ink-700 hover:text-ink-100"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-crimson-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Message thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
          {thread.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-850 border border-ink-800">
                <MessageSquare className="h-6 w-6 text-ink-500" />
              </div>
              <p className="text-sm font-medium text-ink-300">No messages yet</p>
              <p className="mt-1 max-w-[200px] text-xs text-ink-500">
                Start the conversation below. Introduce yourself and explain what you need or can offer.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {thread.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      msg.isMe
                        ? 'rounded-br-md bg-crimson-600 text-white'
                        : 'rounded-bl-md bg-ink-800 text-ink-200'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="mt-1 px-1 text-[10px] text-ink-500">
                    {msg.isMe ? 'You' : msg.senderName} · {formatTime(msg.sentAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message input */}
        <div className="border-t border-ink-800 p-4">
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e as unknown as React.FormEvent);
                }
              }}
              rows={1}
              placeholder="Type your message..."
              className="max-h-24 flex-1 resize-none rounded-xl border border-ink-700 bg-ink-950 px-3.5 py-2.5 text-sm text-ink-100 placeholder-ink-500 transition-all duration-200 focus:border-crimson-600 focus:outline-none focus:ring-2 focus:ring-crimson-600/20"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-crimson-600 text-white shadow-lg shadow-crimson-900/30 transition-all duration-300 hover:bg-crimson-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-[10px] text-ink-500">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
