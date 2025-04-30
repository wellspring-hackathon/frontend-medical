import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Patient = {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
}

type PatientListProps = {
  patients: Patient[];
}

export function PatientList({ patients }: PatientListProps) {
  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={`/placeholder.svg?height=40&width=40`}
                alt={patient.name}
              />
              <AvatarFallback>
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{patient.name}</h4>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>{patient.age} years</span>
                <span>•</span>
                <span>Last visit: {patient.lastVisit}</span>
                <span>•</span>
                <span>{patient.condition}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </div>
      ))}
    </div>
  );
}
