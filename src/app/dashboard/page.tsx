import React from 'react';
import { Card } from '@/components/ui/Card/Card';

export default function DashboardOverview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Welcome back, Rajesh!</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <Card>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--foreground)' }}>System Status</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>Active & Optimal</p>
        </Card>
        <Card>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--foreground)' }}>Energy Produced Today</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)' }}>12.4 kWh</p>
        </Card>
        <Card>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--foreground)' }}>Savings This Month</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>₹ 3,240</p>
        </Card>
      </div>

      <Card>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Recent Activity</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <strong>May 28:</strong> Monthly performance report generated.
          </li>
          <li style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <strong>May 15:</strong> Net metering application approved by DISCOM.
          </li>
          <li style={{ paddingBottom: '1rem' }}>
            <strong>May 10:</strong> AMC contract signed and active.
          </li>
        </ul>
      </Card>
    </div>
  );
}
