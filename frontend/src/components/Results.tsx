import React, { useEffect } from "react";
import { findPasswordChars, findPasswordComplexity, getPasswordLength } from "../utils";
import "../Styles/Results.css";
import { TailSpin } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";
import { useState } from "react";



const Results = () => {
  const location = useLocation();
  const { password, strength } = location.state || {};
  const [isGenerateLoading, setGenerateLoading] = useState(false);
  const [isCheckLoading, setCheckLoading] = useState(false);
  const [passwordLength, setPasswordLength] = useState(Number);
  const [suggestions, setSuggestions] = useState([]);
  const [inRockYou, setInRockYou] = useState("");
  const [inTenMill, setInTenMill] = useState("");


  useEffect(() => {
    setPasswordLength(getPasswordLength(password));
    setGenerateLoading(true);
    setCheckLoading(true);
    console.log("Complexity: ",findPasswordComplexity(password));
    const fetchGeneratePasswords = fetch(
      "http://127.0.0.1:5000/generate_passwords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ password: password }),
      }
    );

    const fetchCheckRockYou = fetch("http://127.0.0.1:5000/check_rockyou", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ password: password }),
    });
    const fetchCheck10Mill = fetch("http://127.0.0.1:5000/check_10mill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ password: password }),
    });

    Promise.all([fetchGeneratePasswords, fetchCheckRockYou, fetchCheck10Mill])
      .then(async ([generateResponse, checkRockYouResponse, check10MillRepsonse ]) => {
        if (!generateResponse.ok) throw new Error("Error in generate passwords API");
        if (!checkRockYouResponse.ok) throw new Error("Error in check rockyou API");

        const generateData = await generateResponse.json();
        const checkRockYouData = await checkRockYouResponse.json();
        const check10MillData = await check10MillRepsonse.json()
        setSuggestions(generateData);
        setInRockYou(checkRockYouData); 
        setInTenMill(check10MillData);

      })
      .catch((error) => {
        console.error("Error in API calls: ", error);
        setSuggestions([]);
        setInRockYou("");
      })
      .finally(() => {
        setGenerateLoading(false);
        setCheckLoading(false);
      });
  }, [password]);

  return (
    <div className="results-container">
      <div className="panel">
        <h2 className="heading">Summary</h2>
        <div className="summaryinfo">
          <p> Your Password: {password}</p>
          <p> Password Strength: {strength}</p>
          {passwordLength < 13 ? (
            <p>
              Your password is {passwordLength} characters long and should be at
              least 13.
            </p>
          ) : (
            <p>Your password is longer than 13 characters long and should be considered secure as long as you have used upper and lower case letters as well as numbers, and special characters.</p>
          )}
          <div className="inside-panel">
            <h4 style={{ textAlign: "center" }}>
              Secure Passwords Suggestions
            </h4>

            {isGenerateLoading ? (
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
          <p>
            Your password is {passwordLength} characters long and you use {findPasswordChars(password)}/4 different characters.
          </p>
          <p>Number of combinations:</p>
          <p>{Math.pow(findPasswordComplexity(password),passwordLength)}</p>
          <p>Time taken to bute force:</p>
          <p>{((Math.pow(94,passwordLength)/ 100000000) / 60).toFixed(2)} mins</p>
        </div>
      </div>
      <div className="panel">
        <h2 className="heading">Security</h2>
        {isCheckLoading ? (
          <div className="spinner-container">
            <TailSpin color="#00BFFF" height={40} width={40} />
          </div>
        ) : (
          <div>
            {inRockYou ? (
              <div className="db-info">
                Password found within rockyou.txt
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  color="red"
                  className="icon-result"
                  style={{fontSize: '1.2em'}}

                />
              </div>
            ) : (
              <div className="db-info">
                Password was not found within rockyou.txt
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color="green"
                  className="icon-result"
                  style={{fontSize: '1.2em'}}
                />
              </div>
            )}
            {inTenMill ? (
              <div className="db-info">
                Password found within 10-million-password.txt
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  color="red"
                  className="icon-result"
                  style={{fontSize: '1.2em'}}

                />
              </div>
            ) : (
              <div className="db-info" style={{paddingTop: '10px'}}>
                Password not found within 10-million-password.txt
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color="green"
                  className="icon-result"
                  style={{fontSize: '1.2em'}}
                />
              </div>
            )}
          </div>
          
        )}
      </div>
    </div>
  );
};

export default Results;
