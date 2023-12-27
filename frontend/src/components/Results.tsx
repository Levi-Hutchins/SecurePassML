import React, { useEffect } from "react";
import { findPasswordChars, findPasswordComplexity, getPasswordLength } from "../utils";
import "../Styles/Results.css";
import SecurityInfo from "./SecurityInfo";
import SummaryInfo from "./SummaryInfo";
import MetricsInfo from "./MetricsInfo";
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
    const fetchGeneratePasswords = fetch(
      "http://127.0.0.1:8000/generate_passwords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ password: password }),
      }
    );

    const fetchCheckRockYou = fetch("http://127.0.0.1:8000/check_rockyou", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ password: password }),
    });
    const fetchCheck10Mill = fetch("http://127.0.0.1:8000/check_10mill", {
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
  const passwordChars = findPasswordChars(password);
  const passwordComplexity = findPasswordComplexity(password);

  return (
    <div className="results-container">
    <SummaryInfo 
      password={password}
      strength={strength}
      passwordLength={passwordLength}
      suggestions={suggestions}
      isGenerateLoading={isGenerateLoading}
    />
    <MetricsInfo 
      password={password}
      passwordLength={passwordLength}
      passwordChars={passwordChars}
      passwordComplexity={passwordComplexity}
    />
    <SecurityInfo 
      inRockYou={inRockYou}
      inTenMill={inTenMill}
      isCheckLoading={isCheckLoading}
    />
  </div>
  );
};

export default Results;
