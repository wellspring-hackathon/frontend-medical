import React from "react";

import { type Doctor } from "../../../../types/types";
import { DoctorCard } from "./doctor-card";

type DoctorsListProps = {
  doctors: Doctor[];
};

const DoctorsList: React.FC<DoctorsListProps> = ({ doctors }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {doctors.length > 0 ? (
        doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
      ) : (
        <div className="col-span-full py-10 text-center">
          <h3 className="text-xl font-medium text-gray-700">
            No doctors found
          </h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
