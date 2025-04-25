import React from 'react';
import { useDoctors } from './hooks/useDoctors';
import { getAllSpecialties } from './utils/filterUtils';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel/FilterPanel';
import DoctorList from './components/DoctorList/DoctorList';

function App() {
  const { 
    doctors, 
    allDoctors, 
    loading, 
    error, 
    filters, 
    updateFilters 
  } = useDoctors();

  const specialties = getAllSpecialties(allDoctors);

  const handleSearch = (searchTerm: string) => {
    updateFilters({ searchTerm });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Doctor Finder</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <SearchBar 
            doctors={allDoctors} 
            searchTerm={filters.searchTerm} 
            onSearch={handleSearch} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <FilterPanel 
              specialties={specialties} 
              filters={filters} 
              updateFilters={updateFilters} 
            />
          </div>

          <div className="md:col-span-3">
            <DoctorList 
              doctors={doctors} 
              loading={loading} 
              error={error} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;