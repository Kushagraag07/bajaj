import React from 'react';

interface SortFilterProps {
  selectedSort: string | null;
  onChange: (sortBy: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ selectedSort, onChange }) => {
  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-sort" 
        className="text-lg font-medium mb-3"
      >
        Sort By
      </h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            data-testid="sort-fees"
            checked={selectedSort === 'fees'}
            onChange={() => onChange('fees')}
            className="w-4 h-4 text-blue-600"
          />
          <span>Fees (Low to High)</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            data-testid="sort-experience"
            checked={selectedSort === 'experience'}
            onChange={() => onChange('experience')}
            className="w-4 h-4 text-blue-600"
          />
          <span>Experience (High to Low)</span>
        </label>
      </div>
    </div>
  );
};

export default SortFilter;