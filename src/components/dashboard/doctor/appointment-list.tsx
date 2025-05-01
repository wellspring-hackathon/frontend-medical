import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";

type Appointment = {
  id: string;
  patientName: string;
  time: string;
  date?: string;
  type: string;
  status: string;
};

type DoctorAppointmentListProps = {
  appointments: Appointment[];
};

export function DoctorAppointmentList({
  appointments
}: DoctorAppointmentListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "border-green-200 bg-green-50 text-green-700";
      case "pending":
        return "border-yellow-200 bg-yellow-50 text-yellow-700";
      case "cancelled":
        return "border-red-200 bg-red-50 text-red-700";
      case "completed":
        return "border-blue-200 bg-blue-50 text-blue-700";
      default:
        return "border-gray-200 bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Calendar className="mb-2 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium">No appointments</h3>
          <p className="text-sm text-muted-foreground">
            You don&apos;t have any appointments scheduled.
          </p>
        </div>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex flex-col rounded-lg border p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h3 className="font-medium">{appointment.patientName}</h3>
              <div className="mt-1 flex flex-wrap gap-3">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {appointment.time}
                </div>
                {appointment.date && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {appointment.date}
                  </div>
                )}
                <Badge variant="secondary" className="text-xs">
                  {appointment.type}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`capitalize ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </Badge>
              <Button size="sm">View</Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
