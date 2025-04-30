import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

type Equipment = {
  name: string;
  status: string;
  lastMaintenance: string;
}

type EquipmentStatusProps = {
  equipment: Equipment[];
}

export function EquipmentStatus({ equipment }: EquipmentStatusProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "border-green-200 bg-green-50 text-green-700";
      case "Maintenance Required":
        return "border-yellow-200 bg-yellow-50 text-yellow-700";
      case "Out of Service":
        return "border-red-200 bg-red-50 text-red-700";
      default:
        return "border-gray-200 bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="pb-2 text-left font-medium">Equipment</th>
              <th className="pb-2 text-left font-medium">Status</th>
              <th className="pb-2 text-left font-medium">Last Maintenance</th>
              <th className="pb-2 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.name} className="border-b">
                <td className="py-3">{item.name}</td>
                <td className="py-3">
                  <Badge
                    variant="outline"
                    className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </td>
                <td className="py-3">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{formatDate(item.lastMaintenance)}</span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <Button variant="outline" size="sm">
                    {item.status === "Maintenance Required"
                      ? "Schedule"
                      : "Details"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
