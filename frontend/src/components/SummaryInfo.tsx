import React from "react";
import { TailSpin } from "react-loader-spinner";
import { SummaryInfoProps } from "./Types";

const SummaryInfo: React.FC<SummaryInfoProps> = ({
  password,
  strength,
  passwordLength,
  suggestions,
  isGenerateLoading,
}) => {
  return (
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
          <p>
            Your password is longer than 13 characters long and should be
            considered secure as long as you have used upper and lower case
            letters as well as numbers, and special characters.
          </p>
        )}
        <div className="inside-panel">
          <h4 style={{ textAlign: "center" }}>Secure Passwords Suggestions</h4>

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
  );
};

export default SummaryInfo;
