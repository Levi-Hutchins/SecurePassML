// MetricsInfo.jsx
import React from "react";
import { MetricsInfoProps } from "./Types";
import { findPasswordComplexity } from "../utils";
import { findPasswordChars } from "../utils";
const MetricsInfo: React.FC<MetricsInfoProps> = ({
  password,
  passwordLength,
  passwordChars,
  passwordComplexity,
}) => {
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
        <p>Time taken to bute force:</p>
        <p>{(Math.pow(94, passwordLength) / 100000000 / 60).toFixed(2)} mins</p>
        <br />
        <h4>Password Entropy</h4>
      </div>
    </div>
  );
};

export default MetricsInfo;
