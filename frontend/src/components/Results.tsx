import React, { useEffect } from "react";
import "../Styles/Results.css";
import { TailSpin } from 'react-loader-spinner';

import { useLocation } from "react-router-dom";
import { useState } from "react";
const getPasswordLength = (str:string) => {
  return str.length
}

const Results = () => {
  const location = useLocation();
  const { password, strength } = location.state || {};
  const [isLoading, setLoading] = useState(false)
  const [passwordLength, setPasswordLength] = useState(Number);
  const[suggestions,setSuggestions] = useState([]);


  useEffect(() => {
    setPasswordLength(getPasswordLength(password));

    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/generate_passwords", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({ "password": password }),
        });

        if (!response.ok) throw new Error("Oops something went wrong!");

        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [password]);


  return (

    <div className="results-container">

    <div className="panel">
        <h2 className="heading">Summary</h2>
        <div className="summaryinfo">
          <p> Your Password: {password}</p>
          <p> Password Strength: {strength}</p>

          {
            passwordLength < 13 ?(
              <p>Your password is {passwordLength} characters long and should be at least 13.</p>
            ):(
              <p>Your password is at least 13 character long it is secure.</p>
            )
          }
          <div className="inside-panel">
          <h4 style={{textAlign: 'center'}}>Secure Passwords Suggestions</h4>

            {isLoading ? (
              <div className="spinner-container">
                <TailSpin color="#00BFFF" height={40} width={40} />
              </div>
            ) : (

              <div>
                {suggestions.map((suggestion, index) => (
                  <p key={index}>{suggestion}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="panel">
        <h2 className="heading">Metrics</h2>
        <div className="metricsinfo">
        <p>Your password is {passwordLength} characters long. If you use upper, lower case letters as well as numbers and special characters. There are 94 possible values for any one given character.</p>
        </div>
      </div>
      <div className="panel">
        <h2 className="heading">Security</h2>
        {/* Content for panel 3 */}
      </div>
    </div>
  );
};

export default Results;
