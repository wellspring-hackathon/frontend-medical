import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  hospitalName: string;
  status: string;
}

type AppointmentListProps = {
  appointments: Appointment[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
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
              <div className="flex items-center">
                <div
                  className="mr-2 h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: getStatusColor(appointment.status)
                  }}
                />
                <h3 className="font-medium">{appointment.doctorName}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {appointment.specialty}
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDate(appointment.date)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatTime(appointment.date)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  {appointment.hospitalName}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`capitalize ${
                  appointment.status === "confirmed"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : appointment.status === "pending"
                      ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                      : appointment.status === "completed"
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-red-200 bg-red-50 text-red-700"
                }`}>
                {appointment.status}
              </Badge>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
