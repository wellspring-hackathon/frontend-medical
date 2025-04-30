import { Progress } from "@/components/ui/progress";

type Department = {
  name: string;
  beds: number;
  occupied: number;
}

type BedAvailabilityProps = {
  departments: Department[];
}

export function BedAvailability({ departments }: BedAvailabilityProps) {
  return (
    <div className="space-y-4">
      {departments.map((department) => {
        const occupancyRate = Math.round(
          (department.occupied / department.beds) * 100
        );

        return (
          <div key={department.name} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">{department.name}</span>
              <span className="text-sm text-muted-foreground">
                {department.occupied}/{department.beds} beds
              </span>
            </div>
            <Progress
              value={occupancyRate}
              className="h-2"
              indicatorClassName={
                occupancyRate > 90
                  ? "bg-red-500"
                  : occupancyRate > 75
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{occupancyRate}% occupied</span>
              <span>{department.beds - department.occupied} available</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
