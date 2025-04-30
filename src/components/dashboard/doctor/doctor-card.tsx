"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Clock,
  FileText,
  MapPin,
  Phone,
  Mail,
  Star,
  CalendarIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DoctorCardProps = {
  doctor: {
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
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  // Format availability strings for display
  const availabilityDisplay = doctor.availability.map((slot) => {
    // Assuming availability is stored as "Day: HH:MM AM/PM - HH:MM AM/PM"
    return slot;
  });

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage
              src={doctor.profile.image || "/placeholder.svg"}
              alt={doctor.profile.name}
            />
            <AvatarFallback className="text-lg">
              {getInitials(doctor.profile.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{doctor.profile.name}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              <span>{doctor.specialization}</span>
            </CardDescription>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="grid gap-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Works at:</span>
            <span className="font-medium">
              {doctor.healthcareProvider.name}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="font-medium">License:</span>
            <span>{doctor.licenseNumber}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Availability:</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              {availabilityDisplay.map((slot, index) => (
                <Badge key={index} variant="outline" className="bg-primary/5">
                  {slot}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Contact</span>
              <div className="mt-1 flex items-center gap-1 text-sm">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{doctor.healthcareProvider.contactPhone}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Email</span>
              <div className="mt-1 flex items-center gap-1 truncate text-sm">
                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                <span className="truncate">{doctor.profile.email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        <Button variant="outline" className="w-[48%]">
          View Profile
        </Button>

        <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-[48%]">Book Appointment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book an Appointment</DialogTitle>
              <DialogDescription>
                Select a date and time to book an appointment with Dr.{" "}
                {doctor.profile.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "09:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "01:00 PM",
                    "02:00 PM",
                    "03:00 PM"
                  ].map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      className="justify-center">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => { setBookingDialogOpen(false); }}>
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
