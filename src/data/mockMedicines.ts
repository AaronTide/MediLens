export interface MedicineData {
  name: string;
  medicalTreats: string[];
  simpleTreats: string[];
  sideEffects: string[];
  safetyWarnings: {
    diabetics: 'safe' | 'caution' | 'avoid';
    pregnancy: 'safe' | 'caution' | 'avoid';
    kidneyDisease: 'safe' | 'caution' | 'avoid';
    liverDisease: 'safe' | 'caution' | 'avoid';
  };
}

export const mockMedicines: Record<string, MedicineData> = {
  aspirin: {
    name: 'Aspirin',
    medicalTreats: [
      'Acute myocardial infarction prevention',
      'Ischemic stroke prophylaxis',
      'Fever reduction (antipyretic)',
      'Anti-inflammatory conditions',
      'Mild to moderate pain management'
    ],
    simpleTreats: [
      'Prevents heart attacks',
      'Reduces stroke risk',
      'Brings down fever',
      'Reduces swelling and inflammation',
      'Relieves headaches and minor pain'
    ],
    sideEffects: [
      'Stomach irritation',
      'Nausea',
      'Increased bleeding risk',
      'Ringing in ears',
      'Allergic reactions',
      'Heartburn'
    ],
    safetyWarnings: {
      diabetics: 'safe',
      pregnancy: 'caution',
      kidneyDisease: 'caution',
      liverDisease: 'caution'
    }
  },
  ibuprofen: {
    name: 'Ibuprofen',
    medicalTreats: [
      'Nonsteroidal anti-inflammatory therapy',
      'Musculoskeletal pain management',
      'Dysmenorrhea treatment',
      'Fever reduction',
      'Osteoarthritis symptom relief'
    ],
    simpleTreats: [
      'Reduces pain and swelling',
      'Relieves muscle and joint pain',
      'Helps with menstrual cramps',
      'Lowers fever',
      'Eases arthritis pain'
    ],
    sideEffects: [
      'Stomach upset',
      'Dizziness',
      'Headache',
      'Constipation',
      'Fluid retention',
      'High blood pressure'
    ],
    safetyWarnings: {
      diabetics: 'caution',
      pregnancy: 'avoid',
      kidneyDisease: 'avoid',
      liverDisease: 'caution'
    }
  },
  metformin: {
    name: 'Metformin',
    medicalTreats: [
      'Type 2 diabetes mellitus management',
      'Insulin resistance reduction',
      'Hepatic glucose production inhibition',
      'Polycystic ovary syndrome treatment',
      'Metabolic syndrome management'
    ],
    simpleTreats: [
      'Controls blood sugar levels',
      'Helps body use insulin better',
      'Prevents liver from making too much sugar',
      'Treats PCOS symptoms',
      'Improves metabolism'
    ],
    sideEffects: [
      'Nausea',
      'Diarrhea',
      'Stomach pain',
      'Loss of appetite',
      'Metallic taste',
      'Vitamin B12 deficiency'
    ],
    safetyWarnings: {
      diabetics: 'safe',
      pregnancy: 'caution',
      kidneyDisease: 'avoid',
      liverDisease: 'caution'
    }
  }
};