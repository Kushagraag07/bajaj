import { Doctor, FilterState } from '../types';

export const filterDoctors = (doctors: Doctor[], filters: FilterState): Doctor[] => {
  return doctors.filter((doctor) => {
    // Filter by search term
    const matchesSearchTerm = !filters.searchTerm || 
      doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

    // Filter by consultation mode
    const matchesConsultMode = !filters.consultMode || 
      doctor.consultMode.includes(filters.consultMode);

    // Filter by specialties
    const matchesSpecialties = filters.specialties.length === 0 || 
      doctor.specialty.includes(filters.specialties);

    return matchesSearchTerm && matchesConsultMode && matchesSpecialties;
  });
};

export const sortDoctors = (doctors: Doctor[], sortBy: string | null): Doctor[] => {
  if (!sortBy) return doctors;

  return [...doctors].sort((a, b) => {
    if (sortBy === 'fees') {
      return a.fees - b.fees; // ascending
    } else if (sortBy === 'experience') {
      return b.experience - a.experience; // descending
    }
    return 0;
  });
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    if (Array.isArray(doctor.specialty)) {
      doctor.specialty.forEach(specialty => {
        specialtiesSet.add(specialty);
      });
    }
  });
  
  return Array.from(specialtiesSet).sort();
};

export const getQueryParams = (): FilterState => {
  const params = new URLSearchParams(window.location.search);
  
  return {
    searchTerm: params.get('search') || '',
    consultMode: params.get('consultMode'),
    specialties: params.getAll('specialty'),
    sortBy: params.get('sortBy')
  };
};

export const updateQueryParams = (filters: FilterState): void => {
  const params = new URLSearchParams();
  
  if (filters.searchTerm) {
    params.set('search', filters.searchTerm);
  }
  
  if (filters.consultMode) {
    params.set('consultMode', filters.consultMode);
  }
  
  filters.specialties.forEach(specialty => {
    params.append('specialty', specialty);
  });
  
  if (filters.sortBy) {
    params.set('sortBy', filters.sortBy);
  }
  
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
};