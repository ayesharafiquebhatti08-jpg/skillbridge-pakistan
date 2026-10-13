import { useState, useEffect } from 'react';
import type { CategoryId, ListingType } from '@/types';
import { categories } from '@/types';
import { X, Send, Sparkles, MapPin, Phone } from 'lucide-react';

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    category: CategoryId;
    location: string;
    description: string;
    type: ListingType;
    postedBy: string;
    contactPhone: string;
  }) => void;
}

const pakistanCities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Gujranwala', 'Hyderabad',
  'Sialkot', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Mardan',
];

export function PostModal({ open, onClose, onSubmit }: PostModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryId>('tech');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ListingType>('offering');
  const [postedBy, setPostedBy] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setTitle('');
      setCategory('tech');
      setLocation('');
      setDescription('');
      setType('offering');
      setPostedBy('');
      setContactPhone('');
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Please enter a title';
    else if (title.trim().length < 5) newErrors.title = 'Title must be at least 5 characters';
    if (!location.trim()) newErrors.location = 'Please enter a city';
    if (!description.trim()) newErrors.description = 'Please add a description';
    else if (description.trim().length < 15) newErrors.description = 'Description must be at least 15 characters';
    if (!postedBy.trim()) newErrors.postedBy = 'Please enter your name';
    if (!contactPhone.trim()) newErrors.contactPhone = 'Please enter a contact number';
    else if (contactPhone.trim().length < 7) newErrors.contactPhone = 'Please enter a valid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      category,
      location: location.trim(),
      description: description.trim(),
      type,
      postedBy: postedBy.trim(),
      contactPhone: contactPhone.trim(),
    });
  };

  const fieldLabel = (text: string) => (
    <span className="mb-1.5 block text-sm font-medium text-ink-200">{text}</span>
  );

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-ink-950 px-4 py-2.5 text-sm text-ink-100 placeholder-ink-500 transition-all duration-200 focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-crimson-600 focus:ring-crimson-600/30'
        : 'border-ink-700 focus:border-crimson-600 focus:ring-crimson-600/20'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-ink-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson-600/15 text-crimson-500">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-100">Post a Skill or Request</h2>
              <p className="text-xs text-ink-400">Share what you can offer or what you need help with</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-ink-800 hover:text-ink-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5">
          {/* Type toggle */}
          <div className="mb-5">
            {fieldLabel('I am')}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setType('offering')}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  type === 'offering'
                    ? 'border-crimson-600 bg-crimson-600/15 text-crimson-400'
                    : 'border-ink-700 bg-ink-950 text-ink-400 hover:border-ink-600'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Offering Help
              </button>
              <button
                type="button"
                onClick={() => setType('requesting')}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  type === 'requesting'
                    ? 'border-crimson-600 bg-crimson-600/15 text-crimson-400'
                    : 'border-ink-700 bg-ink-950 text-ink-400 hover:border-ink-600'
                }`}
              >
                <MapPin className="h-4 w-4" />
                Requesting Help
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            {fieldLabel('Title')}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Quran Tutoring for Beginners"
              className={inputClass('title')}
            />
            {errors.title && <p className="mt-1.5 text-xs text-crimson-400">{errors.title}</p>}
          </div>

          {/* Category + Location row */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              {fieldLabel('Category')}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className={inputClass('category')}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-ink-900">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {fieldLabel('City')}
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                list="pk-cities"
                placeholder="e.g. Lahore"
                className={inputClass('location')}
              />
              <datalist id="pk-cities">
                {pakistanCities.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              {errors.location && <p className="mt-1.5 text-xs text-crimson-400">{errors.location}</p>}
            </div>
          </div>

          {/* Your name + phone row */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              {fieldLabel('Your Name')}
              <input
                type="text"
                value={postedBy}
                onChange={(e) => setPostedBy(e.target.value)}
                placeholder="e.g. Ali Ahmed"
                className={inputClass('postedBy')}
              />
              {errors.postedBy && <p className="mt-1.5 text-xs text-crimson-400">{errors.postedBy}</p>}
            </div>
            <div>
              {fieldLabel('Contact Number')}
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="e.g. +92 300 1234567"
                className={inputClass('contactPhone')}
              />
              {errors.contactPhone && <p className="mt-1.5 text-xs text-crimson-400">{errors.contactPhone}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            {fieldLabel('Description')}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe what you're offering or what you need — include details like timing, experience level, or any preferences."
              className={`${inputClass('description')} resize-none`}
            />
            {errors.description && <p className="mt-1.5 text-xs text-crimson-400">{errors.description}</p>}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-400 transition-colors hover:bg-ink-800 hover:text-ink-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-crimson-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-crimson-900/30 transition-all duration-300 hover:bg-crimson-700 hover:shadow-crimson-900/40"
            >
              <Send className="h-4 w-4" />
              Post Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
