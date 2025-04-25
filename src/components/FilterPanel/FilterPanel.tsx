import React from 'react';
import { FilterState } from '../../types';
import ConsultationFilter from './ConsultationFilter';
import SpecialtyFilter from './SpecialtyFilter';
import SortFilter from './SortFilter';

interface FilterPanelProps {
  specialties: string[];
  filters: FilterState;
  updateFilters: (filters: Partial<FilterState>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  specialties, 
  filters, 
  updateFilters 
}) => {
  const handleConsultModeChange = (mode: string) => {
    updateFilters({ 
      consultMode: filters.consultMode === mode ? null : mode 
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    
    updateFilters({ specialties: updatedSpecialties });
  };

  const handleSortChange = (sortBy: string) => {
    updateFilters({ 
      sortBy: filters.sortBy === sortBy ? null : sortBy 
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <ConsultationFilter 
        selectedMode={filters.consultMode} 
        onChange={handleConsultModeChange} 
      />
      
      <SpecialtyFilter 
        specialties={specialties} 
        selectedSpecialties={filters.specialties} 
        onChange={handleSpecialtyChange} 
      />
      
      <SortFilter 
        selectedSort={filters.sortBy} 
        onChange={handleSortChange} 
      />
    </div>
  );
};

export default FilterPanel;