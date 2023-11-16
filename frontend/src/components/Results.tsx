import React from 'react';
import '../Styles/Results.css'; 
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


const Results = () => {

    const location = useLocation();
    const { givenPassword, strength } = location.state || {}; 
    function generateSecurePassword(password: string){
        
    }    

    return (
    <div className="results-container">
      <div className="panel">
        <h2 className='heading'>Summary</h2>
        <div className="summaryinfo">
            <p> Your Password: {givenPassword}</p>
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

export default Results;
