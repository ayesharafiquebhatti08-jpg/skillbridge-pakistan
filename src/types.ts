export type CategoryId = 'tech' | 'tutoring' | 'creative' | 'community';

export type ListingType = 'offering' | 'requesting';

export interface Listing {
  id: string;
  title: string;
  category: CategoryId;
  location: string;
  description: string;
  type: ListingType;
  postedBy: string;
  postedAt: string;
  postedDate: number;
}

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  { id: 'tech', label: 'Tech', icon: 'Cpu', description: 'Programming, IT, and digital skills' },
  { id: 'tutoring', label: 'Tutoring', icon: 'GraduationCap', description: 'Academic subjects and test prep' },
  { id: 'creative', label: 'Creative', icon: 'Palette', description: 'Design, art, music, and content' },
  { id: 'community', label: 'Community Help', icon: 'HeartHandshake', description: 'Errands, repairs, and local support' },
];
