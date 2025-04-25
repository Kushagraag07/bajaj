import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2, Search } from 'lucide-react';
import { Doctor } from '../../types';
import DoctorCard from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, loading, error }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="mt-4 text-gray-600">Finding the best doctors for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center h-64"
      >
        <div className="text-center p-8 bg-red-50 rounded-xl">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (doctors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center h-64"
      >
        <div className="text-center p-8">
          <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No doctors found matching your criteria</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <div className="space-y-6">
        {doctors.map((doctor, index) => (
          <DoctorCard key={doctor.id} doctor={doctor} index={index} />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default DoctorList;