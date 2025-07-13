import React from 'react';
import { MedicineData } from '../data/mockMedicines';
import { Pill, Heart, AlertTriangle, Shield, CheckCircle, XCircle, Info } from 'lucide-react';

interface MedicineCardProps {
  medicine: MedicineData;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const getSafetyIcon = (status: 'safe' | 'caution' | 'avoid') => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'caution':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'avoid':
        return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getSafetyColor = (status: 'safe' | 'caution' | 'avoid') => {
    switch (status) {
      case 'safe':
        return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'caution':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'avoid':
        return 'text-red-400 bg-red-900/20 border-red-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Disclaimer */}
      <div className="bg-gray-700/50 rounded-2xl p-6 border-l-4 border-teal-500">
        <p className="text-sm text-gray-300">
          <strong className="text-white">Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. Always consult with your healthcare provider before starting, stopping, or changing any medication.
        </p>
      </div>

      {/* Medicine Header */}
      <div className="bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-r from-teal-500 to-green-500 p-4 rounded-2xl">
            <Pill className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{medicine.name}</h2>
            <p className="text-teal-400">Medicine Information</p>
          </div>
        </div>
      </div>

      {/* Medical Treats & Simple Treats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Medical Treats */}
        <div className="bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-600 p-3 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Medical Uses</h3>
          </div>
          <ul className="space-y-3">
            {medicine.medicalTreats.map((treat, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{treat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Simple Treats */}
        <div className="bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600 p-3 rounded-xl">
              <Info className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Simple Explanation</h3>
          </div>
          <ul className="space-y-3">
            {medicine.simpleTreats.map((treat, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{treat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Side Effects */}
      <div className="bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-600 p-3 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Possible Side Effects</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicine.sideEffects.map((effect, index) => (
            <div key={index} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300 text-sm">{effect}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Warnings */}
      <div className="bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-600 p-3 rounded-xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Safety Warnings</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className={`rounded-xl p-4 border ${getSafetyColor(medicine.safetyWarnings.diabetics)}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Diabetics</span>
              {getSafetyIcon(medicine.safetyWarnings.diabetics)}
            </div>
            <p className="text-sm mt-1 capitalize">{medicine.safetyWarnings.diabetics}</p>
          </div>
          
          <div className={`rounded-xl p-4 border ${getSafetyColor(medicine.safetyWarnings.pregnancy)}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Pregnancy</span>
              {getSafetyIcon(medicine.safetyWarnings.pregnancy)}
            </div>
            <p className="text-sm mt-1 capitalize">{medicine.safetyWarnings.pregnancy}</p>
          </div>
          
          <div className={`rounded-xl p-4 border ${getSafetyColor(medicine.safetyWarnings.kidneyDisease)}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Kidney Disease</span>
              {getSafetyIcon(medicine.safetyWarnings.kidneyDisease)}
            </div>
            <p className="text-sm mt-1 capitalize">{medicine.safetyWarnings.kidneyDisease}</p>
          </div>
          
          <div className={`rounded-xl p-4 border ${getSafetyColor(medicine.safetyWarnings.liverDisease)}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">Liver Disease</span>
              {getSafetyIcon(medicine.safetyWarnings.liverDisease)}
            </div>
            <p className="text-sm mt-1 capitalize">{medicine.safetyWarnings.liverDisease}</p>
          </div>
        </div>
      </div>
    </div>
  );
};