"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define types
type AppointmentInfo = {
  patient: string;
  type: string;
};

type DayAppointments = {
  [timeSlot: string]: AppointmentInfo | undefined;
};

type WeekAppointments = {
  [day: string]: DayAppointments;
};

// Define type for availability data
type AvailabilityData = {
  [day: string]: string[];
};

// Mock data for the schedule
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM"
];

// Mock availability data with proper typing
const availabilityData: AvailabilityData = {
  Monday: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
  Tuesday: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
  Wednesday: ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  Thursday: [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM"
  ],
  Friday: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"],
  Saturday: ["10:00 AM", "11:00 AM"],
  Sunday: []
};

const appointmentData: WeekAppointments = {
  Monday: {
    "9:00 AM": { patient: "John Smith", type: "Check-up" },
    "2:00 PM": { patient: "Mary Johnson", type: "Follow-up" }
  },
  Tuesday: {
    "11:00 AM": { patient: "Robert Davis", type: "New Patient" }
  },
  Wednesday: {
    "2:00 PM": { patient: "Sarah Wilson", type: "Consultation" }
  },
  Thursday: {},
  Friday: {
    "10:00 AM": { patient: "Michael Brown", type: "Check-up" }
  },
  Saturday: {},
  Sunday: {}
};

export function DoctorSchedule() {
  const [currentWeek, setCurrentWeek] = useState(0);

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => prev - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => prev + 1);
  };

  // Get the date for each day of the week
  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7); // Start from Monday

    return weekDays.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day,
        date: date.getDate(),
        month: date.toLocaleString("default", { month: "short" }),
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
      };
    });
  };

  const weekDates = getWeekDates();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Weekly Schedule</h3>
          <p className="text-sm text-muted-foreground">
            Manage your availability and appointments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Week{" "}
            {currentWeek === 0
              ? "Current"
              : currentWeek > 0
                ? `+${currentWeek}`
                : currentWeek}
          </span>
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-2">
            {/* Time column */}
            <div className="pt-16">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-16 px-2 py-1 text-right text-sm text-muted-foreground">
                  {time}
                </div>
              ))}
            </div>

            {/* Days columns */}
            {weekDates.map((weekDay) => (
              <div key={weekDay.day} className="flex flex-col">
                <div
                  className={`mb-2 flex flex-col items-center rounded-lg p-2 text-center ${
                    weekDay.isToday
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                  <span className="text-sm font-medium">{weekDay.day}</span>
                  <span className="text-xs">
                    {weekDay.month} {weekDay.date}
                  </span>
                </div>

                {timeSlots.map((time) => {
                  // Fixed line with proper typing
                  const dayAvailability = availabilityData[weekDay.day] || [];
                  const isAvailable = dayAvailability.includes(time);

                  const dayAppointments: DayAppointments =
                    appointmentData[weekDay.day] || {};
                  const appointment = dayAppointments[time];

                  return (
                    <div
                      key={`${weekDay.day}-${time}`}
                      className={`mb-2 h-14 rounded border p-1 ${
                        isAvailable
                          ? appointment
                            ? "border-primary bg-primary/10"
                            : "border-dashed border-muted-foreground/20 bg-background"
                          : "bg-muted/30"
                      }`}>
                      {appointment && (
                        <div className="h-full overflow-hidden text-xs">
                          <div className="font-medium">
                            {appointment.patient}
                          </div>
                          <Badge
                            variant="outline"
                            className="mt-0.5 text-[10px]">
                            {appointment.type}
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button>Update Schedule</Button>
      </div>
    </div>
  );
}
