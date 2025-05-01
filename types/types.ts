// Type definitions for our app

export type Doctor = {
  id: string;
  userId: string;
  healthcareProviderId: string;
  specialization: string;
  licenseNumber: string;
  availability: string[];
  createdAt: string | Date;
  updatedAt: string | Date;

  profile: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };

  healthcareProvider: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    contactPhone: string;
  };
};

export type HealthcareProvider = {
  id: string;
  name: string;
  address: string;
  localGovernment: string;
  city: string;
  state: string;
  contactPhone: string;
  contactEmail: string;
  specialties: string[];
  availableBeds: number;
  equipment: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  doctors: Doctor[]; // Added for convenience
};
