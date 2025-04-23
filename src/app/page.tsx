import { CTA, Features, Footer, HealthProviders, HeroSection, Navbar, Perks, Steps } from "@/components/landing-page-components";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <Perks />
      <Features />
      <Steps />
      <HealthProviders />
      <CTA />
      <Footer />
    </div>
  );
}
