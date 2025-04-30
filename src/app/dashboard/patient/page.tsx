import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Search } from "lucide-react";
import { AppointmentList } from "@/components/dashboard/patient/appointment-list";
import { DoctorSearchCard } from "@/components/dashboard/patient/doctor-search-card";
import { UpcomingAppointment } from "@/components/dashboard/patient/upcoming-appointment";

// Mock data
const upcomingAppointments = [
  {
    id: "appt_1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "2025-05-02T10:30:00",
    hospitalName: "General Hospital",
    status: "confirmed"
  },
  {
    id: "appt_2",
    doctorName: "Dr. Michael Chen",
    specialty: "Dermatology",
    date: "2025-05-10T14:00:00",
    hospitalName: "City Medical Center",
    status: "pending"
  }
];

const pastAppointments = [
  {
    id: "appt_3",
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    date: "2025-04-15T09:00:00",
    hospitalName: "Community Health Clinic",
    status: "completed"
  },
  {
    id: "appt_4",
    doctorName: "Dr. James Wilson",
    specialty: "Orthopedics",
    date: "2025-04-05T11:30:00",
    hospitalName: "University Teaching Hospital",
    status: "completed"
  }
];

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <Button>Book New Appointment</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Next appointment on{" "}
              {new Date(upcomingAppointments[0].date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Find Doctors</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50+</div>
            <p className="text-xs text-muted-foreground">
              Specialists available for consultation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Healthcare Providers
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Hospitals and clinics in your area
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Your Appointments</CardTitle>
            <CardDescription>
              View and manage your upcoming and past appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                <AppointmentList appointments={upcomingAppointments} />
              </TabsContent>
              <TabsContent value="past">
                <AppointmentList appointments={pastAppointments} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Next Appointment</CardTitle>
            <CardDescription>
              Details about your upcoming appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <UpcomingAppointment appointment={upcomingAppointments[0]} />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3 py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">
                    No upcoming appointments
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Book an appointment with a doctor
                  </p>
                </div>
                <Button>Book Now</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find a Doctor</CardTitle>
          <CardDescription>
            Search for doctors by specialty or location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DoctorSearchCard
              name="Dr. Sarah Johnson"
              specialty="Cardiology"
              hospital="General Hospital"
              rating={4.8}
              image="/placeholder.svg?height=100&width=100"
            />
            <DoctorSearchCard
              name="Dr. Michael Chen"
              specialty="Dermatology"
              hospital="City Medical Center"
              rating={4.7}
              image="/placeholder.svg?height=100&width=100"
            />
            <DoctorSearchCard
              name="Dr. Emily Rodriguez"
              specialty="Pediatrics"
              hospital="Community Health Clinic"
              rating={4.9}
              image="/placeholder.svg?height=100&width=100"
            />
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline">View All Doctors</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
