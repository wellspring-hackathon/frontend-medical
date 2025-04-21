import CTA from "@/components/landing-page-components/cta";
import Features from "@/components/landing-page-components/features";
import Footer from "@/components/landing-page-components/footer";
import HealthProviders from "@/components/landing-page-components/health-providers";
import HeroSection from "@/components/landing-page-components/hero-section";
import Perks from "@/components/landing-page-components/perks";
import Steps from "@/components/landing-page-components/steps";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Perks/>
      <Features/>
      <Steps/>
      <HealthProviders/>
      <CTA/>
      <Footer/>
    </div>
  );
}
