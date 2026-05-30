import { Hero } from '@/components/home/Hero/Hero';
import { TrustBar } from '@/components/home/TrustBar/TrustBar';
import { Services } from '@/components/home/Services/Services';
import { Comparison } from '@/components/home/Comparison/Comparison';
import { Calculator } from '@/components/home/Calculator/Calculator';
import { Subsidy } from '@/components/home/Subsidy/Subsidy';
import { Insurance } from '@/components/home/Insurance/Insurance';
import { Servicing } from '@/components/home/Servicing/Servicing';
import { StateCoverage } from '@/components/home/StateCoverage/StateCoverage';
import { Testimonials } from '@/components/home/Testimonials/Testimonials';
import { FAQ } from '@/components/home/FAQ/FAQ';
import { FinalCTA } from '@/components/home/FinalCTA/FinalCTA';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <TrustBar />
      <Services />
      <Comparison />
      <Calculator />
      <Subsidy />
      <Insurance />
      <Servicing />
      <StateCoverage />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
