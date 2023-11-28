import React, { useEffect } from "react";
import "../Styles/Results.css";
import { TailSpin } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";
import { useState } from "react";
const getPasswordLength = (str: string) => {
  return str.length;
};

const Results = () => {
  const location = useLocation();
  const { password, strength } = location.state || {};
  const [isGenerateLoading, setGenerateLoading] = useState(false);
  const [isCheckLoading, setCheckLoading] = useState(false);
  const [passwordLength, setPasswordLength] = useState(Number);
  const [suggestions, setSuggestions] = useState([]);
  const [inRockYou, setInRockYou] = useState("");

  useEffect(() => {
    setPasswordLength(getPasswordLength(password));
    setGenerateLoading(true);
    setCheckLoading(true);

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

    Promise.all([fetchGeneratePasswords, fetchCheckRockYou])
      .then(async ([generateResponse, checkResponse]) => {
        if (!generateResponse.ok)
          throw new Error("Error in generate passwords API");
        if (!checkResponse.ok) throw new Error("Error in check rockyou API");

        const generateData = await generateResponse.json();
        const checkData = await checkResponse.json();

        setSuggestions(generateData);
        setInRockYou(checkData);
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
            <p>Your password is at least 13 character long it is secure.</p>
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
            Your password is {passwordLength} characters long. If you use upper,
            lower case letters as well as numbers and special characters. There
            are 94 possible values for any one given character.
          </p>
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
              <div className="rockyou">
                Your password was found within rockyou.txt
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  color="red"
                  className="icon-result"
                  style={{fontSize: '1.2em'}}

                />
              </div>
            ) : (
              <div className="rockyou">
                Your password was not found within rockyou.txt
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
