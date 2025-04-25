import React from 'react';

interface SpecialtyFilterProps {
  specialties: string[];
  selectedSpecialties: string[];
  onChange: (specialty: string) => void;
}

const SpecialtyFilter: React.FC<SpecialtyFilterProps> = ({ 
  specialties, 
  selectedSpecialties, 
  onChange 
}) => {
  const formatTestId = (specialty: string) => {
    return `filter-specialty-${specialty.replace(/\//g, '-')}`;
  };

  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-speciality" 
        className="text-lg font-medium mb-3"
      >
        Specialty
      </h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {specialties.map((specialty) => (
          <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              data-testid={formatTestId(specialty)}
              checked={selectedSpecialties.includes(specialty)}
              onChange={() => onChange(specialty)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>{specialty}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyFilter;