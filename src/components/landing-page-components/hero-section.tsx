import { Badge } from "../ui/badge";
import RegisterButton from "./register-button";
import SearchButton from "./search-button";
import Image from "next/image";
import { heroImg } from "@/constants";
import { Hospital } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ecfdf5] via-white to-[#f0fdf4] py-24 px-14">
      {/* Animated Blobs */}
      <div className="animate-blob absolute -left-20 -top-20 h-96 w-96 rounded-full bg-green-300 opacity-30 mix-blend-multiply blur-3xl filter"></div>
      <div className="animate-blob animation-delay-2000 absolute right-0 top-0 h-96 w-96 rounded-full bg-teal-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>
      <div className="animate-blob animation-delay-4000 absolute -bottom-20 left-1/3 h-96 w-96 rounded-full bg-emerald-300 opacity-20 mix-blend-multiply blur-3xl filter"></div>

      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center md:gap-8">
        {/* Text Content */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-primary text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-foreground">Quality Healthcare,</span> Just A Click Away
          </h1>

          <p className="text-muted-foreground text-xl sm:text-2xl">
            Connect with Doctors, Healthcare Providers and Hospitals all around
            <span className="ml-2 bg-gradient-to-r from-[hsl(142,70%,45%)] to-[hsl(155,90%,35%)] bg-clip-text font-semibold text-transparent">
              Edo State From your Home
            </span>
            🏡
          </p>
          
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <RegisterButton />
            <SearchButton />
          </div>
        </div>
        
        {/* Image Container */}
        <div className="relative flex justify-center md:justify-end">
          <div className="absolute -left-6 -top-6 h-64 w-64 rounded-full bg-blue-200 opacity-30 mix-blend-multiply blur-xl filter"></div>
          <div className="absolute -bottom-8 -right-8 h-72 w-72 rounded-full bg-purple-200 opacity-30 mix-blend-multiply blur-xl filter"></div>

          <div className="relative z-10 h-auto w-full overflow-hidden rounded-lg shadow-lg max-w-[500px] max-h-[600px]">
            <Image
              src={heroImg}
              alt="Healthcare professionals"
              className="h-auto w-full object-cover"
              width={700}
              height={200}
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Badge Section */}
      <div className="mt-16 flex items-center justify-center">
        <Badge className="border-0 bg-accent text-accent-foreground rounded-full px-6 py-3 text-center text-lg">
          Book Appointments with Qualified Doctors and Reach Top Hospitals Online
          <Hospital className="text-primary hover:text-background ml-2"/>
        </Badge>
      </div>
    </section>
  );
}