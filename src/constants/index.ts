import heroImg from "./hero1.png";
import provImg from "./prov_image.png";
import userRegImg from "./user_reg.png";
import docRegImg from "./doc_reg.png";
import facilityRegImg from "./facility_reg.png";
import facilityRegImg2 from "./facility_reg2.png";
import loginImg from "./login_image.png";

const appName = "WellJourney";
// List of medical specializations
export const medicalSpecializations = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Family Medicine",
  "Gastroenterology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Urology"
] as const;

export {
  appName,
  heroImg,
  provImg,
  userRegImg,
  docRegImg,
  facilityRegImg,
  facilityRegImg2,
  loginImg
};
