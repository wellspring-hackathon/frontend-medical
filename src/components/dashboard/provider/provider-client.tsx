"use client";

import { useState } from "react";
import { ProviderDoctorList } from "@/components/dashboard/provider/doctor-list";
import { UpdateFacilityForm } from "@/components/dashboard/provider/update-facility-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Activity, Bed, Building, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  patients: number;
  availability: string;
};

type ProviderStats = {
  noOfDoctors: number;
  departments: number;
  availableBeds: number;
  noOfEquipments: number;
  hospitalName: string;
  doctors: Doctor[];
  // Removed the unused 'equipment' from here
};

type ProviderClientProps = {
  data: ProviderStats;
};

export default function ProviderClient({ data }: ProviderClientProps) {
  const {
    noOfDoctors,
    departments,
    availableBeds,
    noOfEquipments,
    hospitalName,
    doctors
  } = data;

  const [facilityData, setFacilityData] = useState({
    hospitalName,
    departments,
    availableBeds,
    noOfEquipments
  });

  // Adjusted to avoid using 'any' and added a more specific type for 'updatedData'
  const handleUpdateFacility = (updatedData: Partial<typeof facilityData>) => {
    // In a real application, you would send this data to your API
    console.log("Updating facility with:", updatedData);

    // Update the local state with the new data
    setFacilityData({
      ...facilityData,
      ...updatedData
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Provider Dashboard
          </h1>
          <p className="text-muted-foreground">{facilityData.hospitalName}</p>
        </div>
        <UpdateFacilityForm
          initialData={facilityData}
          onSubmit={handleUpdateFacility}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{noOfDoctors}</div>
            <p className="text-xs text-muted-foreground">
              Active medical professionals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Available Beds
            </CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilityData.availableBeds}
            </div>
            <p className="text-xs text-muted-foreground">
              beds available for patients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facilityData.departments}</div>
            <p className="text-xs text-muted-foreground">
              Specialized medical departments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Equipments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilityData.noOfEquipments}
            </div>
            <p className="text-xs text-muted-foreground">
              Functional equipments in your facility
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid w-full">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Medical Staff</CardTitle>
            <CardDescription>
              Doctors affiliated with your facility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProviderDoctorList doctors={doctors} />
            <div className="mt-4 flex justify-center">
              <Button variant="outline">Manage Doctors</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
