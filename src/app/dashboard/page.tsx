import ProviderClient from "@/components/dashboard/provider/provider-client";
import { redirect } from "next/navigation";

// Mock authentication - replace with your actual auth logic
function getUser() {
  // This would be your actual auth check
  return {
    id: "user_123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "provider", // Change this to test different roles: "patient", "doctor", "admin", "provider"
    isAuthenticated: true
  };
}

export default function DashboardPage() {
  const user = getUser();

  // Redirect based on user role
  if (user.role === "patient") {
    redirect("/dashboard/patient");
  } else if (user.role === "doctor") {
    redirect("/dashboard/doctor");
  } else if (user.role === "admin") {
    redirect("/dashboard/admin");
  } else if (user.role === "provider") {
    const noOfDoctors = 4;
    // fetch the length of doctors connected to a healthcare provider
    const departments = 5;
    // fetch the length of specialities connected to the healthcare provider
    const availableBeds = 5;
    // fetch the array of availble beds and get the length
    const noOfEquipments = 10;
    // fetch the number of equipments the healthcare provider has
    const hospitalName = "General hospital";
    // fetch the name of the healthcare provider from the db

    const doctors = [
      {
        id: "doc_1",
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        patients: 45,
        availability: "Mon, Wed, Fri"
      },
      {
        id: "doc_2",
        name: "Dr. Michael Chen",
        specialty: "Dermatology",
        patients: 38,
        availability: "Tue, Thu, Sat"
      },
      {
        id: "doc_3",
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrics",
        patients: 52,
        availability: "Mon, Tue, Thu"
      },
      {
        id: "doc_4",
        name: "Dr. James Wilson",
        specialty: "Orthopedics",
        patients: 31,
        availability: "Wed, Fri, Sat"
      }
    ];
    // fetch the doctors associated to a particular health care provider

    const equipment = [
      {
        name: "X-Ray Machine",
        status: "Operational",
        lastMaintenance: "2025-04-15"
      },
      {
        name: "MRI Scanner",
        status: "Operational",
        lastMaintenance: "2025-04-10"
      },
      {
        name: "CT Scanner",
        status: "Maintenance Required",
        lastMaintenance: "2025-03-20"
      },
      {
        name: "Ultrasound",
        status: "Operational",
        lastMaintenance: "2025-04-22"
      },
      {
        name: "ECG Machine",
        status: "Operational",
        lastMaintenance: "2025-04-18"
      }
    ];

    // fetch the equipments array of the healthcare provider form the db

    const data = {
      noOfDoctors,

      departments,
      availableBeds,
      noOfEquipments,
      hospitalName,
      doctors,
      equipment
    };
    return (
      <div>
        <ProviderClient data={data} />
      </div>
    );
  }

  // Fallback - should not reach here if roles are properly set
  return (
    <div className="flex h-full items-center justify-center">
      <p>Redirecting to your dashboard...</p>
    </div>
  );
}
