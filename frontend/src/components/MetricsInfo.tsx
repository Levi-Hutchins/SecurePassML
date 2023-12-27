// MetricsInfo.jsx
import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { MetricsInfoProps } from "./Types";
import { findPasswordComplexity } from "../utils";
import { findPasswordChars } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const MetricsInfo: React.FC<MetricsInfoProps> = ({
  password,
  passwordLength,
}) => {
  const [passwordEntropy, setEntropy] = useState(Number);
  useEffect(() => {
    setEntropy(
      Math.log2(Math.pow(findPasswordComplexity(password), passwordLength))
    );
  });
  return (
    <div className="panel">
      <h2 className="heading">Metrics</h2>

      <div className="metricsinfo">
        <h4>Password Complexity</h4>
        <p>
          Your password is {passwordLength} characters long and you use{" "}
          {findPasswordChars(password)}/4 of the different characters.
        </p>
        <p>Number of combinations:</p>
        <p>{Math.pow(findPasswordComplexity(password), passwordLength)}</p>
        <p>Estimate time to crack:</p>
        <p>{(Math.pow(94, passwordLength) / 100000000 / 60).toFixed(2)} mins</p>
        <h4 style={{ paddingTop: "" }}><FontAwesomeIcon icon={faCircleInfo} /> Password Entropy</h4>
        <p>
          Password entropy is a measure of the randomness and unpredictability
          of a password, expressed in bits. The higher the entropy, the more
          difficult the password is to crack through brute force or other
          predictive methods.
        </p>
      </div>
      <br />
      {/*
        Weak entropy = < 40
        Meidum entropy = 40 - 60
        Strong entropy = > 60
      
      
      
      */}
      <div>
        {passwordEntropy > 60 ? (
          <div>
            <Alert
              severity="success"
              style={{
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                height: "50px",
                borderRadius: "20px",
                border: "0.5px solid #00ff62ce",
                color: "#e7e7e7",
                textAlign: "center",
              }}
            >
              Good Entropy: {Math.round(passwordEntropy).toString()} bits
            </Alert>
          </div>
        ) : (
          <div>
            {passwordEntropy < 60 && passwordEntropy > 40 ? (
              <div>
                <Alert
                  severity="warning"
                  style={{
                    backgroundColor: "rgba(255, 193, 7, 0.1)", // Orange-yellow shade with transparency
                    height: "50px",
                    borderRadius: "20px",
                    border: "0.5px solid #ffeb3b", // Bright yellow border
                    color: "#e7e7e7",
                    textAlign: "center",
                  }}
                >
                  Medium Entropy: {Math.round(passwordEntropy).toString()} bits
                </Alert>
              </div>
            ) : (
              <div>
                <Alert
                  severity="error"
                  style={{
                    backgroundColor: "rgba(211, 47, 47, 0.1)", // Semi-transparent red background
                    height: "50px",
                    borderRadius: "20px",
                    border: "0.5px solid #ff1744", // Bright red border
                    color: "#e7e7e7",
                    textAlign: "center",
                  }}
                >
                  Weak Entropy: {Math.round(passwordEntropy).toString()} bits
                </Alert>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsInfo;
