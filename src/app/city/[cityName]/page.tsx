import React from 'react';
import { Hero } from '@/components/home/Hero/Hero';
import { TrustBar } from '@/components/home/TrustBar/TrustBar';
import { FinalCTA } from '@/components/home/FinalCTA/FinalCTA';

export async function generateMetadata({ params }: { params: { cityName: string } }) {
  const city = params.cityName.charAt(0).toUpperCase() + params.cityName.slice(1);
  return {
    title: `Solar Installation in ${city} | BookMySolarHub`,
    description: `Looking for solar installation in ${city}? BookMySolarHub provides end-to-end solar solutions, AMC, and PM Surya Ghar subsidy assistance.`,
  };
}

export default function CityPage({ params }: { params: { cityName: string } }) {
  const cityName = params.cityName.charAt(0).toUpperCase() + params.cityName.slice(1);
  
  return (
    <div>
      <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--primary)', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Solar Installation in {cityName}</h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          The most trusted solar platform for homes and businesses in {cityName}.
        </p>
      </div>
      <TrustBar />
      <Hero />
      <FinalCTA />
    </div>
  );
}
