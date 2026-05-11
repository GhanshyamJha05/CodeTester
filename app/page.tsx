import { AbyssalBackground } from "@/components/abyssal/abyssal-background";
import { AbyssalTerminal } from "@/components/abyssal/abyssal-terminal";
import { SiteFooter } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { PricingSection } from "@/components/landing/pricing-section";
import { SiteNav } from "@/components/landing/site-nav";
import { HowItWorksSection } from "@/components/landing/how-it-works/how-it-works-section";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-abyssal-hellfire-magma selection:text-white bg-black">
      <AbyssalBackground />
      <SiteNav />
      
      <div className="relative z-10">
        <Hero />
        <HowItWorksSection />
        <AbyssalTerminal />
        <PricingSection />
        <SiteFooter />
      </div>

      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] noise opacity-[0.015]" />
    </main>
  );
}

