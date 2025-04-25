import React from 'react';

interface ConsultationFilterProps {
  selectedMode: string | null;
  onChange: (mode: string) => void;
}

const ConsultationFilter: React.FC<ConsultationFilterProps> = ({ selectedMode, onChange }) => {
  return (
    <div className="mb-6">
      <h3 
        data-testid="filter-header-moc" 
        className="text-lg font-medium mb-3"
      >
        Consultation Mode
      </h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            data-testid="filter-video-consult"
            checked={selectedMode === 'Video Consult'}
            onChange={() => onChange('Video Consult')}
            className="w-4 h-4 text-blue-600"
          />
          <span>Video Consult</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            data-testid="filter-in-clinic"
            checked={selectedMode === 'In Clinic'}
            onChange={() => onChange('In Clinic')}
            className="w-4 h-4 text-blue-600"
          />
          <span>In Clinic</span>
        </label>
      </div>
    </div>
  );
};

export default ConsultationFilter;