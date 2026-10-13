import { useState, useMemo, useCallback } from 'react';
import type { Listing, CategoryId, ListingType, Message } from '@/types';
import { mockListings } from '@/data/mockListings';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Header } from '@/components/Header';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ListingCard } from '@/components/ListingCard';
import { PostModal } from '@/components/PostModal';
import { MessageDrawer } from '@/components/MessageDrawer';
import { Search, Frown, Sparkles, TrendingUp } from 'lucide-react';

const STORAGE_KEY_LISTINGS = 'sbpk_listings';
const STORAGE_KEY_MESSAGES = 'sbpk_messages';

function App() {
  const [listings, setListings] = useLocalStorage<Listing[]>(STORAGE_KEY_LISTINGS, mockListings);
  const [messages, setMessages] = useLocalStorage<Message[]>(STORAGE_KEY_MESSAGES, []);
  const [activeFilter, setActiveFilter] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [drawerListing, setDrawerListing] = useState<Listing | null>(null);

  const counts = useMemo(() => {
    const all: Record<string, number> = { all: listings.length };
    for (const l of listings) {
      all[l.category] = (all[l.category] ?? 0) + 1;
    }
    return all;
  }, [listings]);

  const filteredListings = useMemo(() => {
    return listings.filter((l) => {
      const matchesFilter = activeFilter === 'all' || l.category === activeFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.postedBy.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [listings, activeFilter, searchQuery]);

  const handlePost = useCallback(
    (data: {
      title: string;
      category: CategoryId;
      location: string;
      description: string;
      type: ListingType;
      postedBy: string;
      contactPhone: string;
    }) => {
      const newListing: Listing = {
        id: `lst_${Date.now()}`,
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        type: data.type,
        postedBy: data.postedBy,
        postedAt: 'Just now',
        postedDate: Date.now(),
        contactPhone: data.contactPhone,
      };
      setListings((prev) => [newListing, ...prev]);
      setPostModalOpen(false);
    },
    [setListings]
  );

  const handleConnect = useCallback((listing: Listing) => {
    setDrawerListing(listing);
  }, []);

  const handleSendMessage = useCallback(
    (text: string) => {
      if (!drawerListing) return;
      const msg: Message = {
        id: `msg_${Date.now()}`,
        listingId: drawerListing.id,
        senderName: 'You',
        text,
        sentAt: Date.now(),
        isMe: true,
      };
      setMessages((prev) => [...prev, msg]);

      // Simulate a reply after a short delay
      setTimeout(() => {
        const replies = [
          'Thanks for reaching out! I\'d be happy to help. When works best for you?',
          'Great to hear from you. Can you share a bit more about what you\'re looking for?',
          'Hi! Yes, this is still available. Let\'s connect and discuss further.',
          'Thanks for your interest! Feel free to call me at the number shown above.',
          'Hello! I appreciate you reaching out. What\'s your availability like this week?',
        ];
        const reply: Message = {
          id: `msg_${Date.now()}_r`,
          listingId: drawerListing.id,
          senderName: drawerListing.postedBy,
          text: replies[Math.floor(Math.random() * replies.length)],
          sentAt: Date.now(),
          isMe: false,
        };
        setMessages((prev) => [...prev, reply]);
      }, 1200 + Math.random() * 800);
    },
    [drawerListing, setMessages]
  );

  return (
    <div className="min-h-screen bg-ink-950 bg-grid-pattern">
      <Header totalListings={listings.length} onPostClick={() => setPostModalOpen(true)} />

      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-ink-800/60">
        <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-crimson-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-crimson-900/40 bg-crimson-950/30 px-4 py-1.5 text-xs font-medium text-crimson-400 animate-slide-down">
              <Sparkles className="h-3.5 w-3.5" />
              Local skill-sharing, powered by community
            </div>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight text-ink-100 sm:text-4xl lg:text-5xl">
              Share what you know.
              <br />
              <span className="bg-gradient-to-r from-crimson-500 to-crimson-700 bg-clip-text text-transparent">
                Learn what you need.
              </span>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-400 sm:text-lg">
              Connect with people across Pakistan to exchange skills, offer help, or find support — from tech and tutoring to creative arts and community favors.
            </p>

            {/* Search bar */}
            <div className="mx-auto mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by skill, city, or name..."
                  className="w-full rounded-xl border border-ink-700 bg-ink-900 py-3 pl-11 pr-4 text-sm text-ink-100 placeholder-ink-500 transition-all duration-200 focus:border-crimson-600 focus:outline-none focus:ring-2 focus:ring-crimson-600/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter bar + results count */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter active={activeFilter} onChange={setActiveFilter} counts={counts} />
          <div className="flex items-center gap-2 text-sm text-ink-400">
            <TrendingUp className="h-4 w-4 text-crimson-400" />
            <span>
              <span className="font-semibold text-ink-100">{filteredListings.length}</span> {filteredListings.length === 1 ? 'listing' : 'listings'} found
            </span>
          </div>
        </div>

        {/* Listings grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredListings.map((listing, index) => (
              <div
                key={listing.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index * 50, 400)}ms`, opacity: 0 }}
              >
                <ListingCard listing={listing} onConnect={handleConnect} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-850 border border-ink-800">
              <Frown className="h-8 w-8 text-ink-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-ink-200">No listings found</h3>
            <p className="max-w-sm text-sm text-ink-400">
              {searchQuery.trim()
                ? `No results for "${searchQuery}". Try a different search or filter.`
                : 'There are no listings in this category yet. Be the first to post one!'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-5 rounded-xl border border-ink-700 bg-ink-800 px-4 py-2 text-sm font-medium text-ink-200 transition-colors hover:bg-ink-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-800/60 mt-8">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-crimson-600 to-crimson-800">
                <span className="text-sm font-extrabold text-white">S</span>
              </div>
              <span className="text-sm font-medium text-ink-300">
                SkillBridge Pakistan
              </span>
            </div>
            <p className="text-xs text-ink-500">
              Built for communities, by communities. Connecting people across Pakistan.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals & Drawer */}
      <PostModal
        open={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        onSubmit={handlePost}
      />
      <MessageDrawer
        listing={drawerListing}
        messages={messages}
        onClose={() => setDrawerListing(null)}
        onSend={handleSendMessage}
      />
    </div>
  );
}

export default App;
