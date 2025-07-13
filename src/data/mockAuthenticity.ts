export interface AuthenticityData {
  boxId: string;
  medicineName: string;
  isAuthentic: boolean;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  message: string;
  verificationDetails?: {
    hologram: boolean;
    qrCode: boolean;
    serialNumber: boolean;
    packaging: boolean;
  };
}

export const mockAuthenticityData: AuthenticityData[] = [
  {
    boxId: "ASP001234567",
    medicineName: "Aspirin 100mg",
    isAuthentic: true,
    manufacturer: "PharmaCorp Ltd.",
    batchNumber: "ASP2024001",
    expiryDate: "2026-12-31",
    message: "This medicine is authentic and safe to use. All security features verified.",
    verificationDetails: {
      hologram: true,
      qrCode: true,
      serialNumber: true,
      packaging: true
    }
  },
  {
    boxId: "IBU987654321",
    medicineName: "Ibuprofen 200mg",
    isAuthentic: true,
    manufacturer: "MediTech Industries",
    batchNumber: "IBU2024002",
    expiryDate: "2025-08-15",
    message: "Verified authentic medicine. All security checks passed.",
    verificationDetails: {
      hologram: true,
      qrCode: true,
      serialNumber: true,
      packaging: true
    }
  },
  {
    boxId: "MET555666777",
    medicineName: "Metformin 500mg",
    isAuthentic: true,
    manufacturer: "DiabetesCare Pharma",
    batchNumber: "MET2024003",
    expiryDate: "2027-03-20",
    message: "Authentic medicine confirmed. Safe for consumption.",
    verificationDetails: {
      hologram: true,
      qrCode: true,
      serialNumber: true,
      packaging: true
    }
  },
  {
    boxId: "FAKE123456",
    medicineName: "Unknown Medicine",
    isAuthentic: false,
    manufacturer: "Unknown",
    batchNumber: "INVALID",
    expiryDate: "Unknown",
    message: "WARNING: This medicine appears to be counterfeit. Do not use this product and report to authorities.",
    verificationDetails: {
      hologram: false,
      qrCode: false,
      serialNumber: false,
      packaging: false
    }
  },
  {
    boxId: "COUNTERFEIT789",
    medicineName: "Suspicious Product",
    isAuthentic: false,
    manufacturer: "Unverified Source",
    batchNumber: "FAKE001",
    expiryDate: "Unknown",
    message: "DANGER: Counterfeit medicine detected. This product may be harmful. Contact local health authorities immediately.",
    verificationDetails: {
      hologram: false,
      qrCode: true,
      serialNumber: false,
      packaging: false
    }
  },
  {
    boxId: "LIS444555666",
    medicineName: "Lisinopril 10mg",
    isAuthentic: true,
    manufacturer: "CardioMed Pharmaceuticals",
    batchNumber: "LIS2024004",
    expiryDate: "2026-06-10",
    message: "Authentic medicine verified. All security features present.",
    verificationDetails: {
      hologram: true,
      qrCode: true,
      serialNumber: true,
      packaging: true
    }
  },
  {
    boxId: "SUSPICIOUS999",
    medicineName: "Questionable Product",
    isAuthentic: false,
    manufacturer: "Unknown Manufacturer",
    batchNumber: "SUS001",
    expiryDate: "2024-01-01",
    message: "ALERT: This product failed authenticity verification. Multiple security features are missing or invalid.",
    verificationDetails: {
      hologram: false,
      qrCode: false,
      serialNumber: true,
      packaging: false
    }
  }
];

export const checkMedicineAuthenticity = (boxId: string): AuthenticityData | null => {
  return mockAuthenticityData.find(item => 
    item.boxId.toLowerCase() === boxId.toLowerCase()
  ) || null;
};