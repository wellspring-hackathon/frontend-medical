// app/appointment/page.tsx
import Link from "next/link";

const placeholderAppointments = [
  {
    id: "1",
    doctorName: "Dr. Ada Lovelace",
    providerName: "TechHealth Clinic",
    date: "2025-05-05",
    startTime: "10:00 AM",
    status: "confirmed",
    consultationType: "virtual"
  },
  {
    id: "2",
    doctorName: "Dr. Alan Turing",
    providerName: "Wellbeing Center",
    date: "2025-05-07",
    startTime: "2:30 PM",
    status: "pending",
    consultationType: "in-person"
  }
];

export default function AppointmentPage() {
  return (
    <div className="w-full p-6">
      <h1 className="mb-6 text-2xl font-bold">Your Appointments</h1>
      <ul className="space-y-4">
        {placeholderAppointments.map((appt) => (
          <li key={appt.id}>
            <Link
              href={`/dashboard/appointments/${appt.id}`}
              className="block rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50">
              <p className="font-semibold">
                {appt.consultationType} with {appt.doctorName}
              </p>
              <p className="text-sm text-gray-600">
                {appt.date} at {appt.startTime}
              </p>
              <p className="text-sm capitalize text-gray-500">
                Status: {appt.status}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
