import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  hospitalName: string;
  status: string;
}

type UpcomingAppointmentProps = {
  appointment: Appointment;
}

export function UpcomingAppointment({ appointment }: UpcomingAppointmentProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
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
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className={`capitalize ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </Badge>
        <Button variant="outline" size="sm">
          Reschedule
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{appointment.doctorName}</p>
            <p className="text-sm text-muted-foreground">
              {appointment.specialty}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{formatDate(appointment.date)}</p>
            <p className="text-sm text-muted-foreground">Appointment Date</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{formatTime(appointment.date)}</p>
            <p className="text-sm text-muted-foreground">Appointment Time</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">{appointment.hospitalName}</p>
            <p className="text-sm text-muted-foreground">Location</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1">Check In</Button>
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}
