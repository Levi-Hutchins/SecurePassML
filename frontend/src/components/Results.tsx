import React from 'react';
import '../Styles/Results.css'; 
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const PasswordResults = () => {
    const location = useLocation();
    const { password, strength } = location.state || {}; // Or handle the case where state might be undefined
    console.log("strength",strength);
  return (
    <div className="results-container">
      <div className="panel">
        <h2 className='heading'>Summary</h2>
        <div className="summaryinfo">
            <p> Your Password: {password}</p>
            <p> Password Strength: {strength}</p>

        </div>
      </div>
      <div className="panel">
        <h2 className='heading'>Metrics</h2>
        {/* Content for panel 2 */}
      </div>
      <div className="panel">
        <h2 className='heading'>Security</h2>
        {/* Content for panel 3 */}
      </div>
    </div>
  );
};

export default PasswordResults;
