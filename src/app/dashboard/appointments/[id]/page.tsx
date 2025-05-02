// app/appointment/[id]/page.tsx

type PageProps = {
  params: { id: string };
}

const placeholderAppointments = [
  {
    doctorName: "Dr. Ada Lovelace",
    providerName: "TechHealth Clinic",
    date: "2025-05-05",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "confirmed",
    consultationType: "virtual",
    notes: "Follow-up on lab results"
  },
  {
    doctorName: "Dr. Alan Turing",
    providerName: "Wellbeing Center",
    date: "2025-05-07",
    startTime: "2:30 PM",
    endTime: "3:30 PM",
    status: "pending",
    consultationType: "in-person",
    notes: ""
  }
];

export default function AppointmentDetailPage({ params }: PageProps) {
  const appointment = placeholderAppointments[parseInt(params.id)];

  if (!appointment) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold text-red-500">
          Appointment Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="space-y-3 p-6">
      <h1 className="text-2xl font-bold">Appointment Details</h1>
      <p>
        <strong>Doctor:</strong> {appointment.doctorName}
      </p>
      <p>
        <strong>Provider:</strong> {appointment.providerName}
      </p>
      <p>
        <strong>Date:</strong> {appointment.date}
      </p>
      <p>
        <strong>Time:</strong> {appointment.startTime} - {appointment.endTime}
      </p>
      <p>
        <strong>Status:</strong> {appointment.status}
      </p>
      <p>
        <strong>Type:</strong> {appointment.consultationType}
      </p>
      {appointment.notes && (
        <p>
          <strong>Notes:</strong> {appointment.notes}
        </p>
      )}
    </main>
  );
}
