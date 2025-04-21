import React from "react";
import { X } from "lucide-react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appName } from "@/constants";

const problemText = [
  { heading: `Healthcare Without ${appName}` },
  { text: "😔 Long wait times to schedule appointments." },
  { text: "😔 Difficulty finding specialists in your area." },
  { text: "😔 Traveling long distances for consultations." },
  { text: "😔 Managing paper medical records and prescriptions." },
  { text: "😔 Limited access to healthcare information and resources." }
];

const solutionText = [
  { heading: `Healthcare + ${appName}` },
  { text: "😊 Book appointments online in minutes, 24/7." },
  { text: "😊 Easily search for specialists by location and expertise." },
  { text: "😊 Access teleconsultations from the comfort of home." },
  { text: "😊 View and share digital medical records securely." },
  { text: "😊 Get reliable health information and personalized resources." }
];

const Perks = () => {
  return (
    <section className="lg:pb-22 mx-auto px-4 py-12 pt-12 sm:px-6 sm:py-16 sm:pb-20 sm:pt-16 lg:px-8 lg:py-20 lg:pt-20 xl:py-32 xl:pt-24">
      {/* The heading starts here */}
      <div className="mx-auto mb-[70px] flex max-w-screen-xl items-center justify-center text-center lg:max-w-3xl">
        <h2 className="font-display text-primary text-center text-3xl font-bold tracking-tight">
          Looking for an easy way to book appointments with Doctors and
          hospitals around Edo State?
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-24 md:flex-row md:items-start">
        {/* The problem card starts here */}
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="font-semibold">
              {problemText[0].heading}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {problemText.slice(1).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <X className="text-red-500" />
                <p className="py-2">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* The benefits card starts here */}
        <Card className="bg-primary text-foreground">
          <CardHeader>
            <CardTitle>{solutionText[0].heading} </CardTitle>
          </CardHeader>
          <CardContent>
            {solutionText.slice(1).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="text-green-500" />
                <p className="py-2">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Perks;
