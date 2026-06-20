'use client';

import React, { useState, useEffect, useRef } from 'react';
import pincodeData from '../data/pincodes.json';

export default function SavingsCalculator() {
  const [pincode, setPincode] = useState('');
  const [bill, setBill] = useState(3000);
  const [result, setResult] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    
    const handleSliderChange = (e) => {
      setBill(Number(e.target.value));
    };

    // Listen to both native input and change events in case the external script fires them
    el.addEventListener('input', handleSliderChange);
    el.addEventListener('change', handleSliderChange);
    
    return () => {
      el.removeEventListener('input', handleSliderChange);
      el.removeEventListener('change', handleSliderChange);
    };
  }, []);

  const calculateSavings = () => {
    if (pincode.length !== 6) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    const prefix = pincode.substring(0, 2);
    const stateData = pincodeData[prefix] || { state: "India", tariff: 7.5 };
    const tariff = stateData.tariff;

    // 1 kW generates ~120 units per month
    const unitsConsumed = bill / tariff;
    const systemSizeKW = Math.max(1, (unitsConsumed / 120)).toFixed(1);
    
    // 25 years lifetime
    const lifetimeSavings = bill * 12 * 25;

    setResult({
      state: stateData.state,
      tariff,
      systemSizeKW,
      lifetimeSavings,
    });
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#f1fcf8' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0 pe-lg-5">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <img src="https://cdn.solarsquare.in/blog/wp-content/uploads/2026/04/22181940/savings.svg" alt="Calculator" width={30} height={30} style={{ filter: 'hue-rotate(120deg)' }} />
              </div>
            </div>
            <h2 className="fw-bold mb-3" style={{ color: '#1a1f4c', fontSize: '2.5rem' }}>Calculate your savings</h2>
            <p className="lead text-dark">Enter your pincode and average monthly electricity bill to calculate your savings</p>
          </div>
          
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded-4 shadow-sm">
              <div className="mb-4">
                <input 
                  type="number" 
                  className="form-control form-control-lg border-primary" 
                  style={{ borderColor: '#b1c8f6' }}
                  placeholder="PIN Code" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="fw-medium text-dark mb-0">Monthly Electricity Bill <span className="text-muted" style={{cursor: 'help'}} title="Average of your 12-month bill">ⓘ</span></label>
                  <span className="fw-bold fs-5" style={{ color: '#1a1f4c' }}>₹{bill.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range" 
                  ref={sliderRef}
                  className="form-range" 
                  min="500" 
                  max="20000" 
                  step="500" 
                  defaultValue={3000}
                  data-min="500"
                  data-max="20000"
                  style={{ 
                    accentColor: '#a1ead1',
                    height: '10px'
                  }}
                />
              </div>

              <button 
                onClick={calculateSavings}
                className="btn w-100 py-3 fw-bold" 
                style={{ backgroundColor: '#6b72a4', color: 'white', borderRadius: '8px' }}
              >
                Calculate now →
              </button>

              {result && (
                <div className="mt-4 p-4 rounded-3" style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid #a1ead1' }}>
                  <h4 className="fw-bold mb-3" style={{ color: '#1a1f4c' }}>Your Estimated Savings</h4>
                  <div className="row g-3">
                    <div className="col-6">
                      <p className="text-muted mb-1 small">Location</p>
                      <p className="fw-bold mb-0">{result.state}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted mb-1 small">Avg. Tariff</p>
                      <p className="fw-bold mb-0">₹{result.tariff.toFixed(1)} / unit</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted mb-1 small">Suggested System</p>
                      <p className="fw-bold text-primary mb-0">{result.systemSizeKW} kW</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted mb-1 small">Lifetime Savings (25 yrs)</p>
                      <p className="fw-bold text-success mb-0">₹{result.lifetimeSavings.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
