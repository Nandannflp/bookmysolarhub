import React from 'react';
import { Hero } from '@/components/home/Hero/Hero';
import { TrustBar } from '@/components/home/TrustBar/TrustBar';

export async function generateMetadata({ params }: { params: { stateName: string } }) {
  const state = params.stateName.charAt(0).toUpperCase() + params.stateName.slice(1);
  return {
    title: `Solar Company in ${state} | BookMySolarHub`,
    description: `Get professional solar installation, subsidy guidance, and servicing in ${state} with BookMySolarHub.`,
  };
}

export default function StatePage({ params }: { params: { stateName: string } }) {
  const stateName = params.stateName.charAt(0).toUpperCase() + params.stateName.slice(1);
  
  return (
    <div>
      <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--primary)', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Top Solar Company in {stateName}</h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          Join thousands of homeowners in {stateName} saving on their electricity bills.
        </p>
      </div>
      <TrustBar />
      <Hero />
    </div>
  );
}
