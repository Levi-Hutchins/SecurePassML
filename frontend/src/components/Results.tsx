import React from 'react';
import '../Styles/Results.css'; // Import the CSS file for styling

const PasswordResults = () => {
  return (
    <div className="results-container">
      <div className="panel">
        <h2 className='heading'>Panel 1</h2>
        {/* Content for panel 1 */}
      </div>
      <div className="panel">
        <h2 className='heading'>Panel 2</h2>
        {/* Content for panel 2 */}
      </div>
      <div className="panel">
        <h2 className='heading'>Panel 3</h2>
        {/* Content for panel 3 */}
      </div>
    </div>
  );
};

export default PasswordResults;
