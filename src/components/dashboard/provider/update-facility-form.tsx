"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Building, Bed, Activity, CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const facilityFormSchema = z.object({
  hospitalName: z.string().min(2, {
    message: "Hospital name must be at least 2 characters."
  }),
  departments: z.coerce.number().int().positive({
    message: "Number of departments must be a positive number."
  }),
  availableBeds: z.coerce.number().int().nonnegative({
    message: "Available beds must be a non-negative number."
  }),
  totalBeds: z.coerce.number().int().positive({
    message: "Total beds must be a positive number."
  }),
  noOfEquipments: z.coerce.number().int().nonnegative({
    message: "Number of equipment must be a non-negative number."
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters."
  }),
  contactPhone: z.string().min(10, {
    message: "Contact phone must be at least 10 characters."
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address."
  }),
  description: z.string().optional()
});

type FacilityFormValues = z.infer<typeof facilityFormSchema>;

type UpdateFacilityFormProps = {
  initialData: {
    hospitalName: string;
    departments: number;
    availableBeds: number;
    noOfEquipments: number;
    totalBeds?: number;
    address?: string;
    contactPhone?: string;
    contactEmail?: string;
    description?: string;
  };
  onSubmit: (data: FacilityFormValues) => void;
};

export function UpdateFacilityForm({
  initialData,
  onSubmit
}: UpdateFacilityFormProps) {
  const [open, setOpen] = useState(false);

  // Set default values for fields that might not be in initialData
  const defaultValues: Partial<FacilityFormValues> = {
    hospitalName: initialData.hospitalName,
    departments: initialData.departments,
    availableBeds: initialData.availableBeds,
    noOfEquipments: initialData.noOfEquipments,
    totalBeds: initialData.totalBeds || initialData.availableBeds,
    address: initialData.address || "",
    contactPhone: initialData.contactPhone || "",
    contactEmail: initialData.contactEmail || "",
    description: initialData.description || ""
  };

  const form = useForm<FacilityFormValues>({
    resolver: zodResolver(facilityFormSchema),
    defaultValues
  });

  function handleSubmit(data: FacilityFormValues) {
    onSubmit(data);
    // send an update query to the database
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Update Facility Info <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Facility Information</DialogTitle>
          <DialogDescription>
            Make changes to your healthcare facility information here. Click
            save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General Information</TabsTrigger>
                <TabsTrigger value="capacity">Capacity & Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="hospitalName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter facility name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter facility address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a brief description of your facility"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be displayed on your facility profile.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="capacity" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="departments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span>Departments</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="noOfEquipments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            <span>Equipment Count</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <Bed className="h-4 w-4" />
                    <span>Bed Capacity</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="totalBeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Beds</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="availableBeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available Beds</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
