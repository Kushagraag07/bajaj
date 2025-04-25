import { useState, useEffect } from 'react';
import { Doctor, FilterState } from '../types';
import { filterDoctors, sortDoctors, getQueryParams, updateQueryParams } from '../utils/filterUtils';

export const useDoctors = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(getQueryParams());

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors data');
        }
        const data = await response.json();
        setAllDoctors(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load doctors data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Apply filters and update URL when filters change
  useEffect(() => {
    if (allDoctors.length > 0) {
      const filtered = filterDoctors(allDoctors, filters);
      const sorted = sortDoctors(filtered, filters.sortBy);
      setFilteredDoctors(sorted);
      updateQueryParams(filters);
    }
  }, [allDoctors, filters]);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setFilters(getQueryParams());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    doctors: filteredDoctors,
    allDoctors,
    loading,
    error,
    filters,
    updateFilters
  };
};