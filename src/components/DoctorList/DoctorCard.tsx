import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Star, Stethoscope } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      data-testid="doctor-card"
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex-shrink-0 overflow-hidden">
          {doctor.image ? (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold">
              {doctor.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3
                data-testid="doctor-name"
                className="text-xl font-semibold text-gray-900 mb-1"
              >
                {doctor.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="w-4 h-4 text-blue-500" />
                <p
                  data-testid="doctor-specialty"
                  className="text-sm text-gray-600"
                >
                  {Array.isArray(doctor.specialty) ? doctor.specialty.join(', ') : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-green-700">{doctor.ratings}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div
              data-testid="doctor-experience"
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{doctor.experience} years experience</span>
            </div>

            <div
              data-testid="doctor-fee"
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <span className="font-medium text-green-600">₹{doctor.fees}</span>
              <span className="text-gray-500">per consultation</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{doctor.location}</span>
            </div>

            <div className="flex items-center gap-2">
              {doctor.availability && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  Available {doctor.availability[0]}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {(doctor.consultMode || []).map((mode, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${
                  mode === 'Video Consult'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                {mode === 'Video Consult' ? (
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                ) : (
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                )}
                {mode}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;