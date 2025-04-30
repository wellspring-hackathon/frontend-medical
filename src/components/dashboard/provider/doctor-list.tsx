import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  patients: number;
  availability: string;
}

type ProviderDoctorListProps = {
  doctors: Doctor[];
}

export function ProviderDoctorList({ doctors }: ProviderDoctorListProps) {
  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="flex flex-col rounded-lg border p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 flex items-center gap-3 sm:mb-0">
            <Avatar>
              <AvatarImage
                src={`/placeholder.svg?height=40&width=40`}
                alt={doctor.name}
              />
              <AvatarFallback>
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{doctor.name}</h4>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  {doctor.specialty}
                </Badge>
                <span>•</span>
                <span>{doctor.patients} patients</span>
                <span>•</span>
                <span>Available: {doctor.availability}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Schedule
            </Button>
            <Button size="sm">View Profile</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
