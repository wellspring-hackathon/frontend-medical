import DoctorsList from "@/components/dashboard/doctor/doctor-list";
import { Stethoscope } from "lucide-react";

const ProviderDoctorsPage = async () => {
  // fetch the data of doctors associated with a particular healthcare provider from the database

  const doctors = [
    {
      id: "1",
      userId: "user_1",
      healthcareProviderId: "hp_1",
      specialization: "Cardiology",
      licenseNumber: "LIC123456",
      availability: ["Mon", "Wed", "Fri"],
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: "profile_1",
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@example.com",
        image: "https://randomuser.me/api/portraits/women/1.jpg"
      },
      healthcareProvider: {
        id: "hp_1",
        name: "Edo Heart Clinic",
        address: "12 Ring Road",
        city: "Benin City",
        state: "Edo",
        contactPhone: "+2348012345678"
      }
    },
    {
      id: "2",
      userId: "user_2",
      healthcareProviderId: "hp_1",
      specialization: "Dermatology",
      licenseNumber: "LIC234567",
      availability: ["Tue", "Thu", "Sat"],
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: "profile_2",
        name: "Dr. Michael Chen",
        email: "michael.chen@example.com",
        image: "https://randomuser.me/api/portraits/men/2.jpg"
      },
      healthcareProvider: {
        id: "hp_1",
        name: "Edo Heart Clinic",
        address: "12 Ring Road",
        city: "Benin City",
        state: "Edo",
        contactPhone: "+2348098765432"
      }
    },
    {
      id: "3",
      userId: "user_3",
      healthcareProviderId: "hp_1",
      specialization: "Pediatrics",
      licenseNumber: "LIC345678",
      availability: ["Mon", "Tue", "Thu"],
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: "profile_3",
        name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        image: "https://randomuser.me/api/portraits/women/3.jpg"
      },
      healthcareProvider: {
        id: "hp_1",
        name: "Edo Heart Clinic",
        address: "12 Ring Road",
        city: "Benin City",
        state: "Edo",
        contactPhone: "+2348076543210"
      }
    },
    {
      id: "4",
      userId: "user_4",
      healthcareProviderId: "hp_1",
      specialization: "Orthopedics",
      licenseNumber: "LIC456789",
      availability: ["Wed", "Fri", "Sat"],
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: "profile_4",
        name: "Dr. James Wilson",
        email: "james.wilson@example.com",
        image: "https://randomuser.me/api/portraits/men/4.jpg"
      },
      healthcareProvider: {
        id: "hp_1",
        name: "Edo Heart Clinic",
        address: "12 Ring Road",
        city: "Benin City",
        state: "Edo",
        contactPhone: "+2348065432198"
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex h-[40vh] w-full flex-col items-center justify-center gap-4 bg-primary text-primary-foreground">
        <h1 className="text-xl font-semibold md:text-4xl">
          These are the Registered doctors in your facility
        </h1>
        <div className="border-1 flex items-center justify-center rounded-full border-primary bg-primary-foreground p-6 shadow-md">
          <Stethoscope className="text-primary" />
        </div>
      </div>
      <div>
        <DoctorsList doctors={doctors} />
      </div>
    </div>
  );
};

export default ProviderDoctorsPage;
