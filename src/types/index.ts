export interface Doctor {
  id: number;
  name: string;
  specialty: string[];
  experience: number;
  fees: number;
  consultMode: string[];
  location: string;
  availability: string[];
  ratings: number;
  image?: string;
}

export interface FilterState {
  searchTerm: string;
  consultMode: string | null;
  specialties: string[];
  sortBy: string | null;
}