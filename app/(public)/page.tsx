'use client';

import LandingHeader from '@/components/sections/headers/landingHeader';
import LandingHero from '@/components/sections/landing/landingHero'; 
import LandingUpload from '@/components/sections/landing/landingUpload';
import LandingFeatures from '@/components/sections/landing/landingFeatures';
import LandingFooter from '@/components/sections/footers/landingFooter';

export default function LandingPage() {
  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      <LandingHeader />
      <LandingHero />
      <LandingUpload />
      <LandingFeatures />
      <LandingFooter />
    </div>
  );
}