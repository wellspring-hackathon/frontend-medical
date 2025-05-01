import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type DoctorSearchCardProps = {
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  image: string;
};

export function DoctorSearchCard({
  name,
  specialty,
  hospital,
  rating,
  image
}: DoctorSearchCardProps) {
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <Star
            className="absolute left-0 top-0 h-4 w-4 overflow-hidden fill-yellow-400 text-yellow-400"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col items-center p-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={image || "/placeholder.svg"} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="mt-4 text-lg font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{specialty}</p>
          <p className="text-xs text-muted-foreground">{hospital}</p>
          <div className="mt-2 flex items-center">
            {renderStars(rating)}
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
          <Button className="mt-4 w-full">Book Appointment</Button>
        </div>
      </CardContent>
    </Card>
  );
}
